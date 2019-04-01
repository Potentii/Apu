import TimeoutError from './timeout-error'
const { ipcRenderer } = electronRequire('electron');

export function send(channel, data, timeout = 0){
   return new Promise((resolve, reject) => {
      if(typeof timeout !== 'number' || Number.isNaN(timeout) || timeout < 0)
         return reject(new Error('Invalid timeout value'));

      /**
       * The timeout id
       * @type {Number}
       */
      let timer_id;

      // *Declaring the error response callback handler:
      var handleErrorResponse = (e, arg) => {
         if(timer_id)
            clearTimeout(timer_id);
         ipcRenderer.removeListener(channel, handleResponse);
         reject(arg);
      };

      // *Declaring the response callback handler:
      var handleResponse = (e, arg) => {
         if(timer_id)
            clearTimeout(timer_id);
         ipcRenderer.removeListener(channel, handleErrorResponse);
         resolve(arg);
      };

      // *Setting the timeout functionality, if a time was specified:
      if(timeout !== 0){
         timer_id = setTimeout(() => {
            ipcRenderer.removeListener(channel, handleResponse);
            ipcRenderer.removeListener(channel, handleErrorResponse);
            reject(new TimeoutError('Timeout reached'));
         }, timeout);
      }

      // *Listening for response or errors:
      ipcRenderer.once(channel, handleResponse);
      ipcRenderer.once(channel + '@error', handleErrorResponse);

      // *Logging sent messages:
      console.log(`Message sent to "${channel}":`, data);

      // *Sending the message to the electron ipc channel:
      ipcRenderer.send(channel, data);
   });
}
