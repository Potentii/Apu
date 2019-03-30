// TODO rename it to ConnectionData
module.exports = class Connection{
   constructor(host, port, queue_manager, channel, username, password){
      if(!host || !port || !queue_manager)
         throw new Error(`Missing required fields for creating a connection`);

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
         obj.queue_manager,
         obj.channel,
         obj.username,
         obj.password);
   }
};
