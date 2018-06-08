module.exports = class Connection{
   constructor(host, port, queueManager, channel, username, password){
      this.host = host;
      this.port = port;
      this.queueManager = queueManager;
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
