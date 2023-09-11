let folderName;

let iconCache;

let folderNameDom = document.querySelector(".container .folderName");


const getIcon = async (file, img) => {
    //console.log(typeof iconCache, iconCache, file);

    const setSrc = (icon) => img.src = (icon.addPreText? "data:image/png;base64,": "") + icon.content;

    if(iconCache[file]){
        console.log(new Date().getMilliseconds(), "red from cache");
        setSrc(iconCache[file]);

    } else {
        console.log(new Date().getMilliseconds(), "red from api");
        api.getIcon(file).then(icon => {
            setSrc(icon);

            iconCache[file] = icon;
            api.iconCache({action: "write", iconCache})
        })
    }
}


(async () => { 
    api.folderName()
        .then(name => folderName = folderNameDom.innerHTML = name);

    await api.iconCache({action: "create"});

    let iconCacheString = await api.iconCache({action: "read"});
    iconCache = JSON.parse(iconCacheString);

    
    files = await api.getFolder(); 

    if(files == "no data") return alert("Error: "+files)
    if(files) {
        files.forEach(file => {
            if(file.ignore) return; 
            
            let a = document.createElement("a");
                a.className = "item"; 
                a.title = file.name;
                a.dataset.fullName = file.fullName;
                a.dataset.path = file.path;
                a.addEventListener("click", async ()=>{
                    let res = await api.openFile(decodeURI(a.dataset.path))
                
                    if(res != "success") alert("error: "+ res);
                    else setTimeout(()=>api.close(), 1000);
                });
                

            let img = document.createElement("img");  
                getIcon(file.fullName, img)
                

            let span = document.createElement("span");
                span.innerHTML = file.name;

            a.append(img, span);

            document.querySelector(".grid").append(a);
                
        })

        if(files.length == 2){
            document.querySelector(".grid").innerHTML=`<p style="text-align: center">you have no item right now...
            <br>
            <br>
            Click on the plus icon (+) on the top right to add itens to this folders!</p>`;
        }
    }
})();


document.querySelector(".addApps").addEventListener("click", async () => { 
    let res = await api.openFolderDir(folderName);

    if(res != "success") alert("error: "+ res);
    else setTimeout(()=>api.close(), 1000);
});