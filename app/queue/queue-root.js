import * as cache           from '/infra/cache/util'
import QueueVO              from './queue-vo';
import * as queues_list_ipc from './list/ipc';


const QUEUES_DATA_FILE = 'queues.json';


export default class QueueRoot{
	constructor(){ }


	/**
	 *
	 * @returns {Promise<QueueVO[]>}
	 */
	static async loadQueuesFromCache(){
		return (await cache.getArray(QUEUES_DATA_FILE))
			// *Casting the entries to the VO:
			.map(QueueVO.from);
	}


	/**
	 *
	 * @param {QueueVO[]} queues
	 * @returns {Promise<void>}
	 */
	static async saveQueuesOnCache(queues){
		return await cache.save(QUEUES_DATA_FILE, queues);
	}


	/**
	 *
	 * @param {SavedConnection} connection
	 * @param {QueueVO[]} known_queues
	 * @returns {Promise<QueueVO[]>}
	 */
	static async loadQueuesFromMQ(connection, known_queues){
		const known_queues_from_connection = known_queues.filter(queue => queue.connection_id === connection.id);
		return (await queues_list_ipc.loadQueuesFromConnection(connection.data))
			// *Casting the entries to the VO:
			.map(name => {
				const existing_queue = known_queues_from_connection.find(known_queue => known_queue.name === name);
				if(existing_queue)
					return existing_queue;
				return new QueueVO(name, connection.id);
			});
	}
}