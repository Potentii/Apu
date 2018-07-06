import * as ipc from '/infra/electron-ipc'



/**
 * [sendMessage description]
 * @param  {Connection} connection_data [description]
 * @param  {Message} message            [description]
 * @return {Promise}                    [description]
 */
export function sendMessage(connection_data, message){
   return Promise.resolve();

   // const data = {
   //    connection: {
   //       host:         connection_data.host,
   //       port:         connection_data.port,
   //       queueManager: connection_data.queue_manager,
   //       channel:      connection_data.channel,
   //       username:     connection_data.username,
   //       password:     connection_data.password
   //    },
   //    message: {
   //       queueName:     queue.name,
   //       correlationId: this.form.correlation_id,
   //       body:          this.form.message
   //    }
   // };
   //
   // return ipc.send('messages:send', data, 10000)
   //    .then(res => {
   //       // TODO handle response
   //    });
}
