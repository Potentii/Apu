const { ipcMain } = require('electron');
const operations = require('./mq-operations');

module.exports.build = mq => {
   ipcMain.on('messages:send', (e, { connection, message }) => {
      operations.sendMessage(mq, connection, message)
         .then(res => e.sender.send('messages:send', res))
         .catch(err => e.sender.send('messages:send@error', err));
   });
};
