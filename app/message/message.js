module.exports = class Message{
   constructor(queueName, correlationId, body){
      this.queueName = queueName;
      this.correlationId = correlationId;
      this.body = body;
   }

   static from(obj){
      return new Message(
         obj.queueName,
         obj.correlationId,
         obj.body);
   }
};
