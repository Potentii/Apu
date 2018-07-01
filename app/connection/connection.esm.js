// TODO rename it to ConnectionData
export default class Connection{
   constructor(host, port, queue_manager, channel, username, password){
      this.host = host;
      this.port = port;
      this.queue_manager = queue_manager;
      this.channel = channel;
      this.username = username;
      this.password = password;
   }

   static from(obj){
      return new Connection(
         obj.host,
         obj.port,
         obj.queueManager,
         obj.channel,
         obj.username,
         obj.password);
   }
};
