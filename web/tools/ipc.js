// import { ipcRenderer } from 'electron'
// ]]
const { ipcRenderer } = nodeRequire('electron');

export function send(channel, data, timeout = 0){
   // let ipcRenderer = {};
   return new Promise((resolve, reject) => {
      if(typeof timeout !== 'number' || Number.isNaN(timeout) || timeout < 0)
         return reject(new Error('Invalid timeout value'));

      let timer;

      var handleErrorResponse = (e, arg) => {
         if(timer)
            clearTimeout(timer);
         ipcRenderer.removeListener(channel, handleResponse);
         reject(arg);
      };

      var handleResponse = (e, arg) => {
         if(timer)
            clearTimeout(timer);
         ipcRenderer.removeListener(channel, handleErrorResponse);
         resolve(arg);
      };


      if(timeout !== 0){
         timer = setTimeout(() => {
            ipcRenderer.removeListener(channel, handleResponse);
            ipcRenderer.removeListener(channel, handleErrorResponse);
            reject(new TimeoutError('Timeout reached'));
         }, timeout);
      }

      console.log(channel, data);
      ipcRenderer.once(channel, handleResponse);
      ipcRenderer.once(channel + '@error', handleErrorResponse);
      ipcRenderer.send(channel, data);
   });
}


export class TimeoutError{
   constructor(){}
}
