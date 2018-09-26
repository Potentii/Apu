const path = require('path');
const electron = require('electron');
const shortcuts = require('electron-localshortcut');
const { app, BrowserWindow } = electron;
const ipc_routes = require('../app/channels');


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
   window: {
      minWidth: 450,
      minHeight: 450,
      width: 860,
      height: 600,
      center: true,
      backgroundColor: "#EEEEEE"
   },
   // address: 'file://' + path.join(__dirname, '../project/parcel-build/index.html')
   address: 'http://localhost:1234'
};



// *When electron is ready:
app.on('ready', () => {
   // *Setting up the ipc routes:
   ipc_routes.build();
   // *Creating the window frame:
   createWindow(settings);
});


app.on('will-quit', e => {
   removeShortcuts(win);
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

   const window_settings = settings.window;
   window_settings.show = false;

   // *Setting up the window frame:
   win = new BrowserWindow(window_settings);

   // *When the window closes:
   win.on('closed', () => {
      // *Removing the window reference:
      win = null;
   });

   win.once('ready-to-show', () => {
      // *Displaying the window frame:
      win.show();
   });


   // *Loading the html file:
   win.loadURL(settings.address);

   // *Removing the default menu bar:
   win.setMenu(null);

   createShortcuts(win);
}


function createShortcuts(win){

   if(!shortcuts.isRegistered(win, 'F12'))
      shortcuts.register(win, 'F12', () => {
         win.toggleDevTools();
      });

   if(!shortcuts.isRegistered(win, 'F5'))
      shortcuts.register(win, 'F5', () => {
         win.reload();
      });

   if(!shortcuts.isRegistered(win, 'CmdOrCtrl+R'))
      shortcuts.register(win, 'CmdOrCtrl+R', () => {
         win.reload();
      });

   if(!shortcuts.isRegistered(win, 'CmdOrCtrl+Shift+R'))
      shortcuts.register(win, 'CmdOrCtrl+Shift+R', () => {
         win.reload();
      });

}


function removeShortcuts(win){
   shortcuts.unregisterAll(win);
}
