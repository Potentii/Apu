const { ipcMain } = require('electron');
const mq_operations = require('../mq/operations');

module.exports.build = mq => {
   ipcMain.on('queues:list', (e, { connection }) => {
      mq_operations.listQueues(mq, connection)
         .then(res => e.sender.send('queues:list', res))
         .catch(err => e.sender.send('queues:list@error', err));
   });
};
