<div align="center">
    
![Logo](https://raw.githubusercontent.com/NaN-NaN-sempai/Windows-App-Folder/main/src/assets/icon/logo.ico)
# Windows App Folder

</div>

<br>

Windows App Folder is an Windows app made with Electron.js, it creates stylized folders for Apps or Files that you place inside of it based on [Samsung app folders on android](https://i.redd.it/m9pgij1fv4761.jpg).

> The download link was not created yet, for now compile it yourself using the [Compiling Guide](#compiling).

You can use [this link (not working)](./) to download the compiled project and just use it or check the code, edit and compile it on your computer.

The project uses [electron-acrylic-window](https://www.npmjs.com/package/electron-acrylic-window) so if the Windows opacity option is off the program will not be translucent. Here is a quick video on [how to enable/disable the Windows opacity option](https://www.youtube.com/watch?v=WN8W-d0zbfY):

Tested in Windows 10 and Windows 11, the project works fine on both although on Windows 11 the acrylic effect is much more intense.


## Demonstration
To use Windows App Folder lets first create a custom folder:
1. Open the compiled folder and execute the .exe file. It will open the Folder Creator.
<div align="center">
    <img alt="Create a custom folder" title="Create a custom folder" src="https://raw.githubusercontent.com/NaN-NaN-sempai/Windows-App-Folder/main/readmeContent/createfolder.png">
</div>

2. Select the "+" icon in the top-right of the grey container to create a new custom folder. In the new window write a name and select a style then click `Save`.
<div align="center">
    <img alt="Folder Creator Window" title="Folder Creator Window" src="https://raw.githubusercontent.com/NaN-NaN-sempai/Windows-App-Folder/main/readmeContent/createfolderpage.png">
</div>

3. Your custom folder directory will be created in `~\Documents\Windows App Folder\<myFolderName>` and the file explorer will open this location, this is where you will place your files to be shown in the custom folder.
   
- The folder `windowsAppFolderContent_DontEditOrExclude` contains the shortcut to open this custom folder (copy it to where you want, incuding the Windows's task bar) and the icon cache (it is created when the custom folder is opened, in case of visual bugs you can try deleteing the icon cache file). 
<div align="center">
    <img alt="Folder directory and content" title="Folder directory and content" src="https://raw.githubusercontent.com/NaN-NaN-sempai/Windows-App-Folder/main/readmeContent/foldercontent.png">
</div> 

- You can change the shortcut icon, there are a selection of icons alread saved on the project:
  - `<yourProjectLocation>\src\assets\icon` - if you cloned the project - (files on [Github](https://github.com/NaN-NaN-sempai/Windows-App-Folder/tree/main/src/assets/icon))
  - `<compiledLocation>\resources\app\src\assets\icon` - if you are using the compiled version.

4. Now just open the shortcut and select a file.
<div align="center">
    <img alt="Custom Folder content" title="Custom Folder content" src="https://raw.githubusercontent.com/NaN-NaN-sempai/Windows-App-Folder/main/readmeContent/folderexecution.png">
</div>  

- (optional) In a custom folder, you can click on the "+" icon in the top-right of the grey container to open it's directory.

- (optional) If you forget your custom folder directory, open the compiled .exe file and select one of your's created custom folders, it will open it's directory on file explorer.

## Compiling
    
To compile the project:
1. Clone this project using:
   ```bash
   git clone https://github.com/NaN-NaN-sempai/Windows-App-Folder.git
   ```
   or any other method to clone it.

2. Run npm to install all the required Node Js modules:
   ```bash
   npm i
   ```

3. Run the pack command to compile the project:
   ```bash
   npm run pack
   ```

- You can execute the project on the terminal using:

   To open the Folder Creator:
   ```bash
   npm start
   ```
   To open a custom folder:
   ```bash
   npm start "<myFolderName>" "<myFolderStyle>"
   ```
   myFolderStyle can be either `"typeA"` or `"typeB"`.
## Functionalities

- 2 different styles
- Extract icons from .lnk and .exe files
- Extract icons from Steam and Epic Games .url files


## 

![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
