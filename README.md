
![Logo](https://raw.githubusercontent.com/NaN-NaN-sempai/Windows-App-Folder/main/src/assets/icon/logo.ico)


# Windows App Folder

Windows App Folder is an Windows app made with Electron, it creates stylized folders for Apps or Files that you place inside of it.

You can use [this link (not created yed)](./) to download the compiled project and just use it or check the code, edit and compile it on your computer.

## Demonstration
To use Windows App Folder first create a folder:
1. Open the compiled folder and execute the .exe file. It will open the Folder Creator.
![CreateFolder](https://raw.githubusercontent.com/NaN-NaN-sempai/Windows-App-Folder/main/readmeContent/createfolder.png)
2. Select the "+" icon in the top-right of the grey container.
![createfolderpage](https://raw.githubusercontent.com/NaN-NaN-sempai/Windows-App-Folder/main/readmeContent/createfolderpage.png)
3. write a name and select a type then click save. A Windows Explorer directory will open, this is where you will put your file to be shown.

4. The folder `windowsAppFolderContent_DontEditOrExclude` contains the shortcut to open this custom folder (copy it to where you want, incuding the Windows's task bar, you can change the shortcut icon, there are a selection of icons in this path `<yourProjectLocation>\src\assets\icon` or if you are using the compiled version `<compiledLocation>\resources\app\src\assets\icon`) and the icon cache (it is created when the custom folder is opened, in case of visual bugs you can try deleteing the icon cache file). 
![foldercontent](https://raw.githubusercontent.com/NaN-NaN-sempai/Windows-App-Folder/main/readmeContent/foldercontent.png)

5. Now just open the shortcut and select a file.
![foldercontent](https://raw.githubusercontent.com/NaN-NaN-sempai/Windows-App-Folder/main/readmeContent/folderexecution.png)

- (optional) In a custom folder, you can click on the "+" icon in the top-right of the grey container to open it's directory.

- (optional) If you forget your custom folder directory, open the compiled .exe file and select one of you created custom folders, it will open it's directory.

## Compilling
    
To compile the project:
1. Clone this project, you can use:
   ```bash
   git clone https://github.com/NaN-NaN-sempai/Windows-App-Folder.git
   ```
   or any other method to clone it.

2. Run NPM installations to install all the required Node modules:
   ```bash
   npm i
   ```

3. Run the pack command, it will automatically create compiled project:
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

- 2 styles
- Extract icons from .lnk .exe
- Extract icons from Steam and Epic Games .url files


## 

![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)