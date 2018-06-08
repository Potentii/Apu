const Connection = require('./connection');
const Message = require('./message');


/**
 *
 * @param  {String} res [description]
 * @return {[type]}     [description]
 */
function parseData(res){
   res.data = res.data ? JSON.parse(res.data) : res.data;
   return res;
}

/**
 *
 * @param  {Object} res [description]
 * @return {[type]}     [description]
 */
function throwOnErrors(res){
   if(res.error)
      throw res.error;
   return res;
}



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
      .then(res => parseData(res))
      .then(res => throwOnErrors(res));
};



/**
 * Lists all the queues names found in the MQ server
 * @param  {IPCMaster} mq             The IPC master controller for the MQ
 *                                    driver
 * @param  {Connection} connection    The connection info
 * @return {Promise<IncomingMessage>} A promisse that resolves into the MQ
 *                                    driver response
 */
exports.listQueues = function(mq, connection){
   if(!(connection instanceof Connection))
      connection = Connection.from(connection);

   const req_builder = req => {
      req.setQuery('operation', 'list-queues');
      req.json({ connection });

      // console.log('\n\n'+JSON.stringify(req)+'\n\n');
   };

   return mq.start()
      .then(_ => mq.send(req_builder))
      .then(res => parseData(res))
      .then(res => throwOnErrors(res));
};
