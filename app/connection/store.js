import Connection from './connection.esm'
import SavedConnection from './saved-connection'
import * as cache from './cache'

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
         const connections = await cache.getAllConnections();
         commit('setSavedConnections', connections);
      },


      async createNewSavedConnection({ commit }, new_saved_connection){
         await cache.addConnection(new_saved_connection);
         commit('addSavedConnection', new_saved_connection);
      }
   }
};
