// import * as connection_storage from '../storage/connections'

export default {

   // loadConnectionsFromCache(context){
   //    // *Retrieving all connections stored in the user's cache:
   //    const connections = [] //connection_storage.getAll();
   //
   //    // *Cleaning up the current connections list:
   //    context.commit('clearSavedConnections');
   //
   //    // *Getting each connection:
   //    for(let connection of connections)
   //       // *Adding it in the application state:
   //       context.commit('addSavedConnection', connection);
   // },


   createNewConnection(context, connection){
      // *Adding the connection in the storage:
      // connection_storage.add(connection);

      // *Adding the connection in the application state:
      context.commit('addSavedConnection', connection);
   }

}
