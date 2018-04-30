const path = require('path');
const electron = require('electron');
const { app, BrowserWindow } = electron;



/**
 * The main window frame
 * @type {BrowserWindow}
 */
let win = null;



/**
 * Window configurations
 * @type {Object}
 */
const settings = {
   display: {
      width: 800,
      height: 480,
      color: "#F5F5F5"
   },
   // address: 'file://' + path.join(__dirname, './index.html')
   address: 'http://localhost:1234')
};



// *When electron is ready:
app.on('ready', () => {
   // *Creating the window frame:
   createWindow(settings);
});



// *When all windows get closed:
app.on('window-all-closed', () => {
   // *Checking if the OS is a Macintosh:
   if(process.platform !== 'darwin')
      // *If it's not:
      // *Quitting the application:
      app.quit();
});



// *When user re-focus the application:
app.on('activate', () => {
   // *Checking if windows reference is lost:
   if(win === null)
      // *If it is:
      // *Creates the window again:
      createWindow(settings);
});



/**
 * Creates a new window frame
 * @author Guilherme Reginaldo Ruella
 */
function createWindow(settings){

   // *Setting up the window frame:
   win = new BrowserWindow({
      width: settings.display.width,
      height: settings.display.height,
      backgroundColor: settings.display.color,
      show: false
   });

   // *When the window closes:
   win.on('closed', () => {
      // *Removing the window reference:
      win = null;
   });

   win.once('ready-to-show', () => {
      // *Displaying the window frame:
      win.show();
   });

   // *Removing the default toolbar:
   //win.setMenu(null);

   // *Loading the html file:
   win.loadURL(settings.address);
}
