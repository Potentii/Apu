import Entity from '../entity'

export default class SavedQueue extends Entity{
   constructor(name){
      super(name);
      this.name = name;
   }

   static from(obj){
      return new SavedQueue(obj.name);
   }
}
