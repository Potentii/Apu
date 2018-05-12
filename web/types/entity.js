export class Entity {
   constructor(id){
      this._id = id;
   }

   static from(obj){
      return new Entity(obj.id);
   }

   equals(other){
      return other !== null
         && other !== undefined
         && other.constructor === this.constructor
         && other.id === this.id;
   }

   get id(){
      return this._id;
   }
}
