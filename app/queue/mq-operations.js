const Connection = require('../connection/connection.common');
const mq_res_utils = require('../../infra/mq-response-utils');



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
      .then(res => mq_res_utils.parseData(res))
      .then(res => mq_res_utils.throwOnErrors(res));
};
