import Entity from '../entity'



export default class QueueVO extends Entity{


	/**
	 * @constructor
	 * @param {String} name
	 * @param {String} connection_id
	 * @param {Number} [last_use]
	 * @param {Boolean} [starred]
	 */
	constructor(name, connection_id, last_use = null, starred = false){
		super(QueueVO.buildId(connection_id, name));
		this.name = name;
		this.connection_id = connection_id;
		this.last_use = last_use;
		this.starred = starred;
	}


	static from(obj){
		return new QueueVO(
			obj.name,
			obj.connection_id,
			obj.last_use,
			obj.starred
		);
	}


	static buildId(connection_id, queue_name){
		return `${connection_id}:${queue_name}`;
	}


}
