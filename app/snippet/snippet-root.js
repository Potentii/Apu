import * as cache from '/infra/cache/util'
import SnippetVO  from './snippet-vo'


const SNIPPETS_DATA_FILE = 'snippets.json';


export default class SnippetRoot{
	constructor(){ }


	/**
	 *
	 * @returns {Promise<SnippetVO[]>}
	 */
	static async loadSnippetsFromCache(){
		return (await cache.getArray(SNIPPETS_DATA_FILE))
		// *Casting the entries to the VO:
			.map(SnippetVO.from);
	}


	/**
	 *
	 * @param {SnippetVO[]} snippets
	 * @returns {Promise<void>}
	 */
	static async saveSnippetsOnCache(snippets){
		return await cache.save(SNIPPETS_DATA_FILE, snippets);
	}

}