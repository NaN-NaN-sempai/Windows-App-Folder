/* 
    building exe:
    npm run pack

    building folder creator:
    (make sure to change the name of the main file)
    npm run packFolders
*/



const {app, /* BrowserWindow, */ ipcMain , shell } = require("electron");
const { BrowserWindow } = require('electron-acrylic-window');
const path = require("path");
const fs = require("fs");
const Fs = require('@supercharge/fs');
const { exec } = require("node:child_process");



const getIcon = require("./getIcon");


var home = require("os").homedir();
var appDIr = home + '/Documents/Windows App Folder';

if (!fs.existsSync(appDIr)){
    fs.mkdirSync(appDIr);
}

let cmdLineArgs;
const isPackaged = app.isPackaged;

if(!isPackaged) cmdLineArgs = process.argv.slice(2);
else cmdLineArgs = process.argv.slice(1)

if(!cmdLineArgs.length) process.exit(0);

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
            if (!fs.existsSync(path))
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

    win.maximize()


    ipcMain.handle("openFile", (req, data) => {
        if(!data) return;
        console.log(getCommandLine() + ' ' + data);
        
        exec(getCommandLine() + ' "" "' + data + '"'); 

        return "success"
    })


    ipcMain.handle("iconCache", (req, data) => {
        let { action, iconCache } = data;
        let folder = cmdLineArgs[0];

        let fileDir = appDIr+"/"+folder+"/windowsAppFolderContent_DontEditOrExclude/iconsCache.json";

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
        
        let isDir = fs.lstatSync(fileDir).isDirectory() ; 

        if(isDir){
            fileIcon = {
                addPreText: false,
                content: "assets/icon/logo.png"
            }
        } else {
            try {
                fileIcon = {
                    addPreText: true,
                    content: await getIcon(fileDir)
                }
            } catch (err) {
                fileIcon = {
                    addPreText: false,
                    content: "assets/icon/unrecognizedFile.png",
                    errorCode: err
                } 
            } 
        } 

        return fileIcon;
    })


    ipcMain.handle("folderName", (req, data) => {
        let folder = cmdLineArgs[0];

        return folder
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
                    name: Fs.filename(fileDir),
                    fullName: file,
                    path: encodeURI(fileDir),
                    ignore: file=="windowsAppFolderContent_DontEditOrExclude"
                });

            })
        } 

        return retObj;
    });


    ipcMain.handle("openFolderDir", (req, data) => {
        if(!data) return "no data";

        let finalDir = appDIr + "/" + data;
        
        if(!fs.existsSync(finalDir)) return "dont exists";

        require('child_process').exec('start "" "'+finalDir+'"');

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