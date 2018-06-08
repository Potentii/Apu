const { ipcMain } = require('electron');
const mq_operations = require('../mq/operations');

module.exports.build = mq => {
   ipcMain.on('messages:send', (e, { connection, message }) => {
      mq_operations.sendMessage(mq, connection, message)
         .then(res => e.sender.send('messages:send', res))
         .catch(err => e.sender.send('messages:send@error', err));
   });
};
