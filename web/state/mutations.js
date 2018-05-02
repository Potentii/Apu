import SavedConnection from '../repository/types/saved-connection'

export default {

   setSelectedConnection(state, conn_name){
      state.selected_connection = conn_name;
   },

   clearSavedConnection(state){
      state.saved_connections = [];
   },

   /**
    * Adds a new saved connection in the application state
    * @param {StoredConnection} conn The new connection to be added
    */
   addSavedConnection(state, conn){
      if(!(conn instanceof SavedConnection))
         throw new TypeError(`Cannot add new connection, incorrect type`);

      state.saved_connections.push(conn);
   }
}
