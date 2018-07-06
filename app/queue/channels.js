const { ipcMain } = require('electron');
const operations = require('./mq-operations');

module.exports.build = mq => {
   ipcMain.on('queues:list', (e, { connection }) => {
      operations.listQueues(mq, connection)
         .then(res => e.sender.send('queues:list', res))
         .catch(err => e.sender.send('queues:list@error', err));
   });
};
