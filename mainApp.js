const {app, /* BrowserWindow, */ ipcMain , shell } = require("electron");
const { BrowserWindow } = require('electron-acrylic-window');
const path = require("path");
const fs = require("fs");
const Fs = require('@supercharge/fs');
const { exec } = require("node:child_process");
const extractFileIcon = require("extract-file-icon");
const mime = require('mime-types');

const getIcon = require("./getIcon");


const home = require("os").homedir();
const appDIr = home + '/Documents/Windows App Folder';


const defaultContentFolderName = "windowsAppFolderContent_DontEditOrExclude";

function isImage(filePath) {
    const mimeType = mime.lookup(filePath);
    return mimeType && mimeType.startsWith('image/');
}

if (!fs.existsSync(appDIr)){
    fs.mkdirSync(appDIr);
}

let cmdLineArgs;
const isPackaged = app.isPackaged;

if(!isPackaged) cmdLineArgs = process.argv.slice(2);
else cmdLineArgs = process.argv.slice(1)

function getCommandLine() {
    switch (process.platform) { 
       case 'darwin' : return 'open';
       case 'win32' : return 'start';
       case 'win64' : return 'start';
       default : return 'xdg-open';
    }
}


const workJson = (path) => {
    return {
        create(){
            //if (!fs.existsSync(path))
                fs.writeFileSync(path, JSON.stringify({}, null, "\t"));
        },
        read: () => fs.readFileSync(path, 'utf8'),
        write (data) {
            fs.writeFileSync(path, JSON.stringify(data, null, "\t"), 'utf-8');
        }
    }
} 


const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 1200,
        transparent: true,
        frame: false,
        icon: __dirname + '/src/assets/icon/logo.png',
        vibrancy: {
          theme: '#FFFFFF05', // (default) or 'dark' or '#rrggbbaa'
          effect: 'blur', // (default) or 'blur'
          disableOnBlur: false, // (default)
        }, 
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });
    win.webContents.openDevTools();

    win.maximize()


    ipcMain.handle("openFile", (req, data) => {
        if(!data) return;
        console.log(getCommandLine() + ' ' + data);
        
        exec(getCommandLine() + ' "" "' + data + '"', () => app.quit()); 

        return "success"
    })


    ipcMain.handle("iconCache", (req, data) => {
        let { action, iconCache } = data;
        let folder = cmdLineArgs[0];

        let fileDir = appDIr+"/"+folder+"/"+defaultContentFolderName+"/iconsCache.json";

        let jsonFile = workJson(fileDir);

        if(action == "create") jsonFile.create(); 
        if(action == "read") return jsonFile.read(); 
        if(action == "write") jsonFile.write(iconCache); 
        
        return "success";
    })

    ipcMain.handle("getIcon", async (req, data) => {
        let file = data;
        let folder = cmdLineArgs[0];

        
        let fileIcon;
        let fileDir = appDIr+"/"+folder+"/"+file;
        
        try {

            let useGetIcon = true;
            let iconLocation = fileDir;
            let iconContent;
            
            // if lile is a url
            if(file.toLowerCase().includes(".url")){
                let fileContent = fs.readFileSync(fileDir, 'utf8'); 

                const objectfyFile = () => {
                    lines = fileContent.split("\n").filter(e => e.includes("="));

                    obj = {}
                    lines.forEach(line => { 
                        let [key, value] = line.split("=") 
                        obj[key] = value;
                    }); 

                    return obj;
                }

                // if url is a epic games shortcut
                if(fileContent.toLowerCase().includes("epic games")){
                    obj = objectfyFile();

                    iconLocation = obj.IconFile;
                }

                // if url is a steam shortcut
                if(fileContent.toLowerCase().includes("steam")){
                    obj = objectfyFile(); 

                    let icon = obj.IconFile
                    
                    useGetIcon = false
                    iconContent = fs.readFileSync(icon.slice(0, icon.length-1), {encoding: 'base64'});
                }

            // for any type of file
            } else {
                let normalizedIconLocation = iconLocation.replaceAll("/", "\\");
                useGetIcon = false;

                if(isImage(normalizedIconLocation)) {
                    iconContent = fs.readFileSync(normalizedIconLocation, {encoding: 'base64'});
                } else {
                    iconContent = extractFileIcon(normalizedIconLocation, 320).toString("base64");
                }
                

            }



            fileIcon = {
                addPreText: true,
                content: useGetIcon? await getIcon(iconLocation): iconContent
            }
        } catch (err) {
            console.log(err);
            fileIcon = {
                addPreText: false,
                content: "assets/icon/unrecognizedFile.png",
                errorCode: err
            } 
        } 


        return fileIcon;
    })


    ipcMain.handle("args", (req, data) => {
        return cmdLineArgs
    })

    ipcMain.handle("getFolder", async (req, data) => {
        let folder = cmdLineArgs[0];
        
        
        let files = fs.readdirSync(appDIr+"/"+folder);

        let retObj = [];

        if(!files.length){
            retObj = "no folders";

        } else { 
            

            files.forEach(file => {
                let fileDir = appDIr+"/"+folder+"/"+file;

                retObj.push({
                    time: fs.statSync(fileDir).mtime.getTime(),
                    name: Fs.filename(fileDir),
                    fullName: file,
                    path: encodeURI(fileDir),
                    ignore: file == defaultContentFolderName
                });

            })
        } 

        return retObj;
    });


    ipcMain.handle("openFolderDir", (req, data) => {
        if(!data) return "no data";

        let finalDir = appDIr + "/" + data;
        
        if(!fs.existsSync(finalDir)) return "dont exists";

        exec('start "" "'+finalDir+'"', () => app.quit());

        return "success";
    })





    ipcMain.handle("close", (req, data) => {
        app.quit();
    })



    win.loadFile("src/index.html")
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") app.quit()
})