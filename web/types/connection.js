import Entity from './entity'

export default class Connection extends Entity{
   constructor(name, host, port, queue_manager, channel){
      super('abcd');
      this.name = name;
      this.host = host;
      this.port = port;
      this.queue_manager = queue_manager;
      this.channel = channel;
   }

   static from(obj){
      return new Connection(obj.name, obj.host, obj.port, obj.queue_manager, obj.channel);
   }
}
