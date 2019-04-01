import SavedConnection     from './saved-connection'
import SavedConnectionRoot from './saved-connection-root';



export default {
   namespaced: true,


   state: {
      /**
       * @type {SavedConnection[]}
       */
      saved_connections: [],

      selected_saved_connection: null
   },


   getters: {
      getSavedConnectionByName: state => sc_name => state.saved_connections.find(sc => sc.name === sc_name),
   },


   mutations: {
      addSavedConnection(state, new_saved_connection){
         if(!(new_saved_connection instanceof SavedConnection))
            throw new TypeError(`The "new saved connection" must be a SavedConnection`);

         if(!Array.isArray(state.saved_connections))
            state.saved_connections = [];

         state.saved_connections.push(new_saved_connection);
      },

      removeSavedConnection(state, saved_connection){
         if(!(saved_connection instanceof SavedConnection))
            throw new TypeError(`The "saved connection" must be a SavedConnection`);

         const index_to_remove = (state.saved_connections || [])
            .findIndex(c => c.equals(saved_connection));

         if(index_to_remove < 0)
            throw new Error(`Cannot remove saved connection: connection ${saved_connection.id} not found`);

         state.saved_connections.splice(index_to_remove, 1);
      },

      setSavedConnections(state, saved_connections){
         if(!Array.isArray(saved_connections))
            throw new TypeError(`The "saved_connections" must be an array of SavedConnection`);
         if(!saved_connections.every(sc => sc instanceof SavedConnection))
            throw new TypeError(`All the "saved_connections" entries must be of the SavedConnection type`);

         state.saved_connections = saved_connections;
      },

      clearSelectedSavedConnection(state){
         state.selected_saved_connection = null;
      },

      setSelectedSavedConnection(state, saved_connection){
         if(!(saved_connection instanceof SavedConnection))
            throw new TypeError(`The "selected saved connection" must be a SavedConnection`);

         state.selected_saved_connection = saved_connection;
      }
   },


   actions: {
      async refreshSavedConnectionsFromCache({ commit }){
         const connections = await SavedConnectionRoot.getAll();
         commit('setSavedConnections', connections);
      },


      async createNewSavedConnection({ commit }, new_saved_connection){
         await SavedConnectionRoot.add(new_saved_connection);
         commit('addSavedConnection', new_saved_connection);
      },


      async removeSavedConnection({ commit }, saved_connection){
         await SavedConnectionRoot.remove(saved_connection);
         commit('removeSavedConnection', saved_connection);
      }
   }
};
