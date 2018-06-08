
/**
 * @deprecated
 */
exports.sendMessage = function(connection, message, req){
   req.setQuery('operation', 'send-message')
      .json({ connection, message });
}


/**
 * @deprecated
 */
exports.listQueues = function(connection, req){
   req.setQuery('operation', 'list-queues')
      .json({ connection });
}
