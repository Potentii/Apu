export default {
   /**
    * Adds a new saved connection in the application state
    * @param {StoredConnection} conn The new connection to be added
    */
   addSavedConnection(state, conn){
      if(!(conn instanceof StoredConnection))
         throw new TypeError(`Cannot add new connection, incorrect type`);

      state.saved_connections.push(conn);
   }
}
