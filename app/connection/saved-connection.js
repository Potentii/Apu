import Entity from '../entity'
import Connection from './connection.esm'

export default class SavedConnection extends Entity{
   constructor(name, data){
      super(name);

      if(!name)
         throw new Error(`Invalid connection, it must have a name`);
      this.name = name;

      if(!(data instanceof Connection))
         throw TypeError(`Invalid connection data type, it must extend Connection`);
      this.data = data;
   }

   static from(obj){
      return new SavedConnection(obj.name, Connection.from(obj.data));
   }
}
