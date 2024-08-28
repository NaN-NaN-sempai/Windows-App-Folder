let folderName;

let iconCache;

let folderNameDom = document.querySelector(".container .folderName");
let container = document.querySelector(".container");


const getIcon = async (file, img) => {
    const setSrc = (icon) => img.src = (icon.addPreText? "data:image/png;base64,": "") + icon.content;

    if(iconCache[file]){
        console.log(file, new Date().getMilliseconds(), "read from cache");
        setSrc(iconCache[file]);

    } else {
        console.log(file, new Date().getMilliseconds(), "read from api");
        api.getIcon(file).then(icon => {
            setSrc(icon);

            iconCache[file] = icon;
            api.iconCache({action: "write", iconCache})
        })
    }

    /* MAYBE BETTER?
    const setupIconCache = (doSetSrc) => {
        api.getIcon(file).then(icon => {
            if(doSetSrc) setSrc(icon);

            iconCache[file] = icon;
            api.iconCache({action: "write", iconCache})
        })
    }

    let doSetSrc = true;

    if(iconCache[file]){
        setSrc(iconCache[file]);
        doSetSrc = false;
    }

    console.log(file, new Date().getMilliseconds(), "read from api");
    setupIconCache(doSetSrc); */
}


(async () => { 
    api.args()
        .then(args => {
            folderName = folderNameDom.innerHTML = args[0];

            let styleType = args[1];
            if(!styleType) styleType = "typeB";

            container.classList.add(styleType)
        });

    await api.iconCache({action: "create"});

    let iconCacheString = await api.iconCache({action: "read"});
    iconCache = JSON.parse(iconCacheString);

    
    files = await api.getFolder(); 

    let ignoreCount = 0;

    if(files == "no data") return alert("Error: "+files)
    if(files) {
        files = files.sort((a, b) => b.time - a.time);
        files.forEach(file => {
            if(file.ignore) return ignoreCount++;            
            
            let a = document.createElement("a");
                a.className = "item"; 
                a.title = file.name;
                a.dataset.fullName = file.fullName;
                a.dataset.path = file.path;
                a.addEventListener("click", async ()=>{
                    let res = await api.openFile(decodeURI(a.dataset.path))
                
                    if(res != "success") alert("error: "+ res);
                });
                

            let img = document.createElement("img");  
                getIcon(file.fullName, img)
                

            let span = document.createElement("span");
                span.innerHTML = file.name;

            a.append(img, span);

            document.querySelector(".grid").append(a);
                
        })

        if(files.length <= ignoreCount){
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
});