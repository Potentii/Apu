
/**
 * @abstract
 */
export default class Entity {
   constructor(id){
      this._id = id;
   }

   /**
    * Creates a new entity from the infotmations of the given object
    * @abstract
    * @param  {*} obj  The object to extract the information
    * @return {Entity} A new entity based on the given object
    */
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
