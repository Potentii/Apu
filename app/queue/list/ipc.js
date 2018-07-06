import Queue from '../saved-queue'
import * as ipc from '/infra/electron-ipc'



/**
 * Retrieves all the queues for the given connection
 * @param  {Connection} connection_data The connection info
 * @return {Promise<Queue[]>}           The found queues
 */
export function loadQueuesFromConnection(connection_data){
   const connection = {
      host:         connection_data.host,
      port:         connection_data.port,
      queueManager: connection_data.queue_manager,
      channel:      connection_data.channel,
      username:     connection_data.username,
      password:     connection_data.password
   };

   return Promise.resolve([
      new Queue('QUEUE 1'),
      new Queue('QUEUE 2'),
      new Queue('QUEUE 3'),
      new Queue('QUEUE 4'),
      new Queue('QUEUE 5'),
      new Queue('QUEUE 6'),
      new Queue('QUEUE 7')
   ]);

   // return ipc.send('queues:list', { connection }, 10000)
   //    .then(res => {
   //       const queues_names = res.data
   //          .filter(name => !/^AMQ\..+$/.test(name))
   //          .map(name => new Queue(name));
   //    });
}
