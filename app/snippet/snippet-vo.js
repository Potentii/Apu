import Entity      from '../entity'
import SnippetRoot from './snippet-root';



export default class SnippetVO extends Entity{


	/**
	 * @constructor
	 * @param {String} name
	 * @param {String} [content]
	 * @param {Number} [last_use]
	 */
	constructor(name, content = '', last_use = null){
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


	static validate(obj){
		if(!obj.name || !obj.name.trim().length)
			throw new Error(`Invalid snippet name`);
	}

	static isValid(obj){
		try{
			SnippetVO.validate(obj);
			return true;
		} catch(err){
			return false;
		}
	}


	static buildId(snippet_name){
		return `${snippet_name}`;
	}


	/**
	 * Sets the used date to 'now'
	 */
	setAsUsedNow(){
		this.last_use = Date.now();
	}


	/**
	 * Updates this snippet entry on cache
	 * @return {Promise<void>}
	 */
	async saveOnCache(){
		const snippets = await SnippetRoot.loadSnippetsFromCache();
		const this_index = snippets.findIndex(s => s.id == this.id);
		snippets[this_index] = SnippetVO.from(this);
		await SnippetRoot.saveSnippetsOnCache(snippets);
	}


	/**
	 * Checks if this snippet has the same content as the given one
	 * @param {String} content The content to compare to
	 * @return {Boolean} True if the content is equals, false otherwise
	 */
	hasSameContent(content){
		return this.content == content;
	}


	/**
	 * Checks if this snippet has an equivalent content as the given one
	 * @param {String} content The content to compare to
	 * @return {Boolean} True if the content is equivalent, false otherwise
	 */
	hasEquivalentContent(content){
		return this.hasSameContent(content);
	}


}
