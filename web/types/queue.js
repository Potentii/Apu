export default class Queue{
   constructor(name){
      this.name = name;
   }

   static from(obj){
      return new Queue(obj.name);
   }
}
