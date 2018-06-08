import Connection from '../types/connection'
import Queue      from '../types/queue'

export default {

   markAsLoaded(state){
      state.loaded = true;
   },

   setSelectedConnection(state, conn){
      if(conn === null || conn === undefined)
         state.selected_connection = null;
      else if(!(conn instanceof Connection))
         throw new TypeError(`Invalid type of connection`);
      else
         state.selected_connection = conn;
   },

   setSelectedQueue(state, queue){
      if(queue === null || queue === undefined)
         state.selected_queue = null;
      else if(!(queue instanceof Queue))
         throw new TypeError(`Invalid type of queue`);
      else
         state.selected_queue = queue;
   },

   /**
    * Remove all the saved connections from the application state
    *  It won't remove them from the cache though
    */
   clearSavedConnections(state){
      state.saved_connections = [];
   },

   /**
    * Adds a new saved connection in the application state
    * @param {Connection} conn The new connection to be added
    */
   addSavedConnection(state, conn){
      // *Throwing if the connection is not of the correct type:
      if(!(conn instanceof Connection))
         throw new TypeError(`Cannot add new connection, incorrect type`);

      // *Throwing if there's another connection with the same name:
      if(state.saved_connections.some(c => c.name === conn.name))
         throw new Error(`A connection named "${conn.name}" have already been defined`);

      // *Adding the connection to the application state:
      state.saved_connections.push(conn);
   }
}
