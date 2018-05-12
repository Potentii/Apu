import Entity from './entity.js'

export default class Queue extends Entity{
   constructor(name){
      super('abcd');
      this.name = name;
   }

   static from(obj){
      return new Queue(obj.name);
   }
}
