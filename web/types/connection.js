export default class Connection{
   constructor(host, port, queue_manager, channel){
      this.host = host;
      this.port = port;
      this.queue_manager = queue_manager;
      this.channel = channel;
   }

   static from(obj){
      return new Connection(obj.host, obj.port, obj.queue_manager, obj.channel);
   }
}
