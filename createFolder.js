const {app, /* BrowserWindow, */ ipcMain } = require("electron");
const { BrowserWindow } = require('electron-acrylic-window');
const path = require("path");
const fs = require("fs");
const createShortcut = require('windows-shortcuts');

let home = require("os").homedir();
let appDIr = home + '/Documents/Windows App Folder';

if (!fs.existsSync(appDIr)){
    fs.mkdirSync(appDIr);
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


    ipcMain.handle("getFolders", (req, data) => {
        let folders = fs.readdirSync(appDIr);

        if(!folders.length){
            folders = "no folders";
        }

        return folders;
    })


    ipcMain.handle("createFolder", (req, data) => {
        if(!data || !data.name) return "no data";

        let finalDir = appDIr + "/" + data.name;
        
        if(fs.existsSync(finalDir)) return "alread exists";
        
        fs.mkdirSync(finalDir);
        fs.mkdirSync(finalDir+"/windowsAppFolderContent_DontEditOrExclude/");

        console.log( __dirname+"/WindowsAppFolder-win32-x64/WindowsAppFolder.exe");


        createShortcut.create(finalDir+"/windowsAppFolderContent_DontEditOrExclude/"+data.name+".lnk", {
            target: __dirname+"/WindowsAppFolder-win32-x64/WindowsAppFolder.exe",
            args: `"${data.name}"`,
        }, () => {
            require('child_process').exec('start "" "'+finalDir+'"', () => app.quit()); 
        }); 

        return "success";
    })


    ipcMain.handle("openFolderDir", (req, data) => {
        if(!data) return app.quit();

        let finalDir = appDIr + "/" + data;
         
        require('child_process').exec('start "" "'+finalDir+'"'); 
    })

    ipcMain.handle("close", () => {
        app.quit();
    })



    win.loadFile("src/createFolder.html")
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") app.quit()
})