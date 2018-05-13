import * as storage_utils from './utils'
import Connection from '../types/connection'

const CONNECTIONS_STORE_KEY = 'apu-connections';

export function remove(connection){
   if(connection === null || connection === undefined || !(connection instanceof Connection))
      throw new Error(`Invalid connection to be removed`);

   const filtered_connections = getAll().filter(c => !connection.equals(c));

   save(filtered_connections);
}

export function add(connection){
   if(connection === null || connection === undefined || !(connection instanceof Connection))
      throw new TypeError(`The given connection is not valid`);

   const connections = getAll();

   connections.push(connection);

   save(connections);
}

export function save(connections){
   storage_utils.saveObj(CONNECTIONS_STORE_KEY, connections);
}

export function getAll(){
   return storage_utils.getArrayAndCast(CONNECTIONS_STORE_KEY, Connection) || [];
}
