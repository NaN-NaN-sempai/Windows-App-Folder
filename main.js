const fs = require("fs");

var home = require("os").homedir();
var appDIr = home + '/Documents/Windows App Folder';

if (!fs.existsSync(appDIr)){
    fs.mkdirSync(appDIr);
}

const { app } = require("electron");

let cmdLineArgs;
const isPackaged = app.isPackaged;

if(!isPackaged) cmdLineArgs = process.argv.slice(2);
else cmdLineArgs = process.argv.slice(1)

if(!cmdLineArgs.length) require("./folderCreator");
else require("./mainApp");