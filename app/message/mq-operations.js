const Connection = require('../connection/connection.common');
const Message = require('./message');
const mq_res_utils = require('../../infra/mq-response-utils');



/**
 * Sends a message to the MQ server
 * @param  {IPCMaster} mq             The IPC master controller for the MQ
 *                                    driver
 * @param  {Connection} connection    The connection info
 * @param  {Message} message          The message info
 * @return {Promise<IncomingMessage>} A promisse that resolves into the MQ
 *                                    driver response
 */
exports.sendMessage = function(mq, connection, message){
   if(!(connection instanceof Connection))
      connection = Connection.from(connection);

   if(!(message instanceof Message))
      message = Message.from(message);

   const req_builder = req => {
      req.setQuery('operation', 'send-message');
      req.json({ connection, message });
   };

   return mq.start()
      .then(_ => mq.send(req_builder))
      .then(res => mq_res_utils.parseData(res))
      .then(res => mq_res_utils.throwOnErrors(res));
};
