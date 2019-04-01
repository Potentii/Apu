const path = require('path');
const { IPCMaster } = require('ipc-bridge-nodejs');
const messages_channels = require('./message/channels');
const queues_channels = require('./queue/channels');

// const mq = new IPCMaster('java', ['-jar', './java/ipc-ibm-mq-jar/ipc-ibm-mq.jar']);
// const mq = new IPCMaster('java', ['-jar', './resources/java/ipc-ibm-mq-jar/ipc-ibm-mq.jar']);
const mq = new IPCMaster('java', ['-jar', path.join(process.cwd(), process.env.IPC_IBM_MQ_JAR_LOCATION)]);

module.exports.build = () => {
   mq.start()
      .then(_ => {
         messages_channels.build(mq);
         queues_channels.build(mq);
      })
      .catch(err => {
         console.error(err);
      });
};
