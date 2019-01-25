import Entity from '../entity'



export default class SnippetVO extends Entity{


	/**
	 * @constructor
	 * @param {String} name
	 * @param {String} content
	 * @param {Number} [last_use]
	 */
	constructor(name, content, last_use = null){
		super(SnippetVO.buildId(name));
		this.name = name;
		this.content = content;
		this.last_use = last_use;
	}


	static from(obj){
		return new SnippetVO(
			obj.name,
			obj.content,
			obj.last_use
		);
	}


	static buildId(snippet_name){
		return `${snippet_name}`;
	}


}
