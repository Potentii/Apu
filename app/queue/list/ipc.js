import * as ipc from '/infra/electron-ipc'



/**
 * Retrieves all the queue names for the given connection
 * @param  {Connection} connection_data The connection info
 * @return {Promise<String[]>}          The found queue names
 */
export function loadQueuesFromConnection(connection_data){
   const data = {
      connection: connection_data
   };

   return ipc.send('queues:list', data, 25000)
      .then(res => {
         return res.data
            .filter(name => !/^AMQ\..+$/.test(name));
      });
}
