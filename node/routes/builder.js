const { IPCMaster } = require('ipc-bridge-nodejs');
const messages = require('./messages');
const queues = require('./queues');

const mq = new IPCMaster('java', ['-jar', './java/ipc-ibm-mq-jar/ipc-ibm-mq.jar']);

module.exports.build = () => {
   mq.start()
      .then(_ => {
         messages.build(mq);
         queues.build(mq);
      });
};
