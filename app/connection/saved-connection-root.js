import SavedConnection      from './saved-connection';
const cache = nodeRequire('@potentii/app-data');


const CONNECTIONS_DATA_FILE = 'connections';


export default class SavedConnectionRoot{
	constructor(){ }


	/**
	 *
	 * @returns {Promise<SavedConnection[]>}
	 */
	static async getAll(){
		return (await cache.getArray(CONNECTIONS_DATA_FILE))
			// *Casting the entries to the VO:
			.map(SavedConnection.from);
	}


	/**
	 *
	 * @param {SavedConnection[]} connections
	 * @returns {Promise<void>}
	 */
	static async saveAll(connections){
		return await cache.save(CONNECTIONS_DATA_FILE, connections);
	}


	/**
	 *
	 * @param {SavedConnection} connection
	 * @returns {Promise<void>}
	 */
	static async add(connection){
		return await cache.addToArray(CONNECTIONS_DATA_FILE, connection);
	}


	/**
	 *
	 * @param {SavedConnection} connection
	 * @returns {Promise<void>}
	 */
	static async remove(connection){
		const conns = await SavedConnectionRoot.getAll();
		const index = conns.findIndex(conn => conn.equals(connection));
		conns.splice(index, 1);
		return await cache.save(CONNECTIONS_DATA_FILE, conns);
	}
}