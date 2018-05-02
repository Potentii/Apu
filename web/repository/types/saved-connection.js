import Connection from '../../types/connection'

export default class SavedConnection{
   constructor(name, conn){
      this.name = name;
      if(!(conn instanceof Connection))
         conn = Connection.from(conn);

      this.conn = conn;
   }

   static from(obj){
      return new SavedConnection(obj.name, obj.conn);
   }
}
