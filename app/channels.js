const { IPCMaster } = require('ipc-bridge-nodejs');
const messages_channels = require('./message/channels');
const queues_channels = require('./queue/channels');

const mq = new IPCMaster('java', ['-jar', '../java/ipc-ibm-mq-jar/ipc-ibm-mq.jar']);

module.exports.build = () => {
   mq.start()
      .then(_ => {
         messages_channels.build(mq);
         queues_channels.build(mq);
      });
};
