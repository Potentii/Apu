import * as cache from '/infra/cache/util'
import SnippetVO  from './snippet-vo'


const SNIPPETS_DATA_FILE = 'snippets.json';


export default class SnippetRoot{
	constructor(){ }


	/**
	 * Retrieves all the snippets saved on user's cache
	 * @returns {Promise<SnippetVO[]>} The snippets from cache
	 */
	static async loadSnippetsFromCache(){
		return (await cache.getArray(SNIPPETS_DATA_FILE))
			// *Filtering only the valid snippets:
			.filter(SnippetVO.isValid)
			// *Casting the entries to the VO:
			.map(SnippetVO.from);
	}


	/**
	 * Updates the snippets cache with the new snippets list
	 * @param {SnippetVO[]} snippets The new snippets list
	 * @returns {Promise<void>}
	 */
	static async saveSnippetsOnCache(snippets){
		return await cache.save(SNIPPETS_DATA_FILE, snippets);
	}

}