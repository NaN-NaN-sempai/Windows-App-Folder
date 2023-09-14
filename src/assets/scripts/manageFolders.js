
const form = document.querySelector('.addFolder');
const empty = document.querySelector('.empty');
const folderList = document.querySelector('.grid');
const content = document.querySelector('.content');

let folders;


const toggleDisplay = () => {
    if(folders == "no folders") {
        content.classList.toggle("hidden", false);
        content.style.opacity = 1;
        empty.classList.toggle("hidden", false);
        folderList.classList.toggle("hidden", true);

    } else {
        content.classList.toggle("hidden", true);
        content.style.opacity = 0;
        empty.classList.toggle("hidden", true);
        folderList.classList.toggle("hidden", false);
    }

}


form.querySelector(".return").addEventListener("click", evt => {
    evt.preventDefault();
    toggleDisplay();

    form.classList.toggle("hidden", true); 

    toggleDisplay();
    
})

form.addEventListener('submit', submit);

async function submit(event) {
    event.preventDefault();
    const myFormData = new FormData(event.target);

    const formDataObj = {};
    myFormData.forEach((value, key) => (formDataObj[key] = value));

    if(!formDataObj.name) return alert("error: enpty name");
    
    let res = await api.createFolder(formDataObj);

    if(res != "success") alert("error: "+ res);
    else content.remove();
}

document.querySelector(".addApps").addEventListener("click", () => {
    form.classList.toggle("hidden", false);
    content.classList.toggle("hidden", false);
    content.style.opacity = 1;
    empty.classList.toggle("hidden", true);
    folderList.classList.toggle("hidden", true);
});

(async () => { 
    folders = await api.getFolders(); 

    toggleDisplay();

    if(folders) {
        folders.forEach(folder => {
            
            let a = document.createElement("a");
                a.className = "item";
                a.title = folder;
                a.addEventListener("click", ()=>{
                    api.openFolderDir(folder);
                });

                    let img = document.createElement("img");
                        img.src = "assets/icon/logo.png";

                    let span = document.createElement("span");
                        span.innerHTML = folder;

                a.append(img, span);

            folderList.append(a);
                
        })
    }
})();