import SnippetRoot from './snippet-root'
import SnippetVO   from './snippet-vo'



export default {
	namespaced: true,


	state: {
		/**
		 * @type {SnippetVO[]}
		 */
		snippets: []
	},


	getters: {
		// getQueueById: state => id => state.queues.find(queue => queue._id === id),

	},


	mutations: {
		setSnippets(state, snippets){
			if(!Array.isArray(snippets) || !snippets.every(snippet => snippet instanceof SnippetVO))
				throw new TypeError(`The "cached snippets" must be an array of SnippetVO`);
			state.snippets = snippets;
		}
	},


	actions: {
		async updateSnippets(context, snippets){
			// *Updating the cache:
			await SnippetRoot.saveSnippetsOnCache(snippets);
			// *Updating the store:
			context.commit('setSnippets', snippets);
		},

		async loadSnippetsFromCache(context){
			// *Loading the snippets from cache:
			const snippets = SnippetRoot.loadSnippetsFromCache();
			// *Updating the store:
			context.commit('setSnippets', snippets);
		},

		// async setQueueAsUsedNow(context, queue){
		// 	// *Getting the already known queues:
		// 	const known_queues = context.state.queues.concat([]);
		// 	const found_queue = known_queues.find(known_queue => known_queue._id === queue._id);
		// 	if(!found_queue)
		// 		return;
		//
		// 	found_queue.last_use = Date.now();
		//
		// 	// *Updating the application state and cache:
		// 	await context.dispatch('updateQueues', known_queues);
		// }
	}
};
