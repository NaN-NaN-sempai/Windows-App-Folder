const { contextBridge, ipcRenderer } = require("electron");


contextBridge.exposeInMainWorld("api", {
    title: "test", 
    close: () => ipcRenderer.invoke("close"),
    
    getFolder: (data) => ipcRenderer.invoke("getFolder", data),    
    getFolders: (data) => ipcRenderer.invoke("getFolders", data),
    openFolderDir: (data) => ipcRenderer.invoke("openFolderDir", data),
    createFolder: (data) => ipcRenderer.invoke("createFolder", data),
    openFolderDir: (data) => ipcRenderer.invoke("openFolderDir", data),
    openFile: (data) => ipcRenderer.invoke("openFile", data),
    folderName: (data) => ipcRenderer.invoke("folderName", data),
    getIcon: (data) => ipcRenderer.invoke("getIcon", data),
    iconCache: (data) => ipcRenderer.invoke("iconCache", data),
    
})