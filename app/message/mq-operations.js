const Connection = require('../connection/connection.common');
const Message = require('./message');
const mq_res_utils = require('../../infra/mq-response-utils');



/**
 * Sends a message to the MQ server
 * @param  {IPCMaster} mq             The IPC master controller for the MQ
 *                                    driver
 * @param  {Connection} connection    The connection info
 * @param  {Message} message          The message info
 * @return {Promise<IncomingMessage>} A promise that resolves into the MQ
 *                                    driver response
 */
exports.sendMessage = function(mq, connection, message){
   if(!(connection instanceof Connection))
      connection = Connection.from(connection);

   if(!(message instanceof Message))
      message = Message.from(message);

   const req_builder = req => {
      req.setQuery('operation', 'send-message');
      req.json({
         connection: {
            host:         connection.host,
            port:         connection.port,
            queueManager: connection.queue_manager,
            channel:      connection.channel,
            username:     connection.username,
            password:     connection.password
         },
         message: {
            queueName:     message.queueName,
            correlationId: message.correlationId,
            body:          Buffer.from(message.body).toString('base64')
         }
      });
   };

   return mq.start()
      .then(_ => mq.send(req_builder))
      .then(res => mq_res_utils.parseData(res))
      .then(res => mq_res_utils.throwOnErrors(res));
};
