import SavedConnection from './saved-connection'
import * as cache from '/infra/cache/util'

const CONNECTIONS_CACHE_KEY = 'apu:saved-connections';

export function getAllConnections(){
   return cache.getArray(CONNECTIONS_CACHE_KEY)
      .map(item => SavedConnection.from(item));
}

export function addConnection(new_saved_connection){
   const connections = getAllConnections();

   connections.push(new_saved_connection);

   cache.save(CONNECTIONS_CACHE_KEY, connections);
}

export function removeConnection(saved_connection_to_remove){
   const connections = getAllConnections();

   const index = connections
      .findIndex(connection => connection.equals(saved_connection_to_remove));

   connections.splice(index, 1);

   cache.save(CONNECTIONS_CACHE_KEY, connections);
}
