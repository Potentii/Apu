import SavedConnection from './saved-connection'
import * as cache from '/infra/cache/util'

// const CONNECTIONS_CACHE_KEY = 'apu:saved-connections';
const CONNECTIONS_CACHE_KEY = 'connections.json';

export async function getAllConnections(){
   return (await cache.getArray(CONNECTIONS_CACHE_KEY))
      .map(item => SavedConnection.from(item));
}

export async function addConnection(new_saved_connection){
   const connections = await getAllConnections();

   connections.push(new_saved_connection);

   await cache.save(CONNECTIONS_CACHE_KEY, connections);
}

export async function removeConnection(saved_connection_to_remove){
   const connections = await getAllConnections();

   const index = connections
      .findIndex(connection => connection.equals(saved_connection_to_remove));

   connections.splice(index, 1);

   await cache.save(CONNECTIONS_CACHE_KEY, connections);
}
