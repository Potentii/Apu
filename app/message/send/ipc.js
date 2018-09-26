import * as ipc from '/infra/electron-ipc'



/**
 * [sendMessage description]
 * @param  {Connection} connection_data [description]
 * @param  {Message} message            [description]
 * @return {Promise}                    [description]
 */
export function sendMessage(connection_data, message){
   const data = {
      connection: connection_data,
      message: message
   };
   
   return ipc.send('messages:send', data, 25000);
}
