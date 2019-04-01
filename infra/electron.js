const path = require('path');
const url = require('url');
const dotenv = require('dotenv');
const electron = require('electron');
const shortcuts = require('electron-localshortcut');
const { app, BrowserWindow } = electron;


// *Getting the environment variables:
if(process.env.NODE_ENV === 'development')
   dotenv.config({ path: path.join(process.cwd(), `./.env.development`) });
else
   dotenv.config({ path: path.join(process.cwd(), `./resources/.env`) });


if(process.env.LOADED !== 'YES')
   throw new Error(`'.env' file could not be loaded properly`);


// *loading the IPC channels:
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
      title: 'Apu',
      minWidth:  process.env.WINDOW_MIN_WIDTH  || 450,
      minHeight: process.env.WINDOW_MIN_HEIGHT || 450,
      width:  process.env.WINDOW_WIDTH  || 860,
      height: process.env.WINDOW_HEIGHT || 600,
      center: true,
      backgroundColor: '#EEEEEE'
   },
   // *Checking if the address of the window content is HTTP(S):
   address: /^http/i.test(process.env.PAGE_ADDRESS)
      // *If it is, simply setting it as the address:
      ? process.env.PAGE_ADDRESS
      // *If it's not, assuming the address is a file relative to the project root:
      : url.format({
         protocol: 'file',
         slashes: true,
         pathname: path.join(__dirname, process.env.PAGE_ADDRESS)
      })
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
async function createWindow(settings){

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