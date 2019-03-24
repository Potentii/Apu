import SnippetRoot from './snippet-root'
import SnippetVO   from './snippet-vo'



export default {
	namespaced: true,


	state: {
		/**
		 * @type {SnippetVO[]}
		 */
		snippets: [],

		/**
		 * The name of the snippet being created by the user
		 * @type {String}
		 */
		new_snippet_name: null
	},


	getters: {
		/**
		 * True if there are snippets registered, False otherwise
		 */
		hasAnySnippet: state => _ => !!state.snippets.length
	},


	mutations: {
		/**
		 * Updates the vuex snippets list
		 * @param {SnippetVO[]} snippets The new snippet list
		 */
		setSnippets(state, snippets){
			if(!Array.isArray(snippets) || !snippets.every(snippet => snippet instanceof SnippetVO))
				throw new TypeError(`The "cached snippets" must be an array of SnippetVO`);
			state.snippets = snippets;
		},


		/**
		 * Updates the snippet name input value
		 * @param {String} [name] The name of the snippet
		 */
		setNewSnippetName(state, name){
			state.new_snippet_name = name || null;
		}
	},


	actions: {
		/**
		 * Adds a new snippet on the system
		 * NOTICE: Updates the vuex store and cache
		 * @param {SnippetVO} snippet The new snippet to be added
		 * @return {Promise<void>}
		 */
		async addSnippet(context, snippet){
			const snippets = Array.from(context.state.snippets);
			snippets.push(snippet);
			await context.dispatch('updateSnippets', snippets);
		},


		/**
		 * Removes the given snippet from the system
		 * NOTICE: Updates the vuex store and cache
		 * @param {SnippetVO|String} snippet The snippet to be removed, or its ID
		 * @return {Promise<void>}
		 */
		async removeSnippet(context, snippet){
			if(!snippet)
				throw new Error(`Cannot remove snippet: Invalid snippet "${snippet}"`);

			const index_to_remove = (typeof snippet == 'string')
				? context.state.snippets.findIndex(s => s._id == snippet)
				: context.state.snippets.findIndex(s => s._id == snippet._id);

			const snippets = Array.from(context.state.snippets);

			if(index_to_remove == -1)
				throw new Error(`Cannot remove snippet: Snippet not found on  store "${typeof snippet=='string' ? snippet : snippet._id}"`);

			snippets.splice(index_to_remove, 1);

			await context.dispatch('updateSnippets', snippets);
		},


		/**
		 * Updates the system snippets list
		 * Updates the vuex store and cache
		 * @param {SnippetVO[]} snippets The new snippets list
		 * @return {Promise<void>}
		 */
		async updateSnippets(context, snippets){
			// *Updating the cache:
			await SnippetRoot.saveSnippetsOnCache(snippets);
			// *Updating the store:
			context.commit('setSnippets', snippets);
		},

		async loadSnippetsFromCache(context){
			// *Loading the snippets from cache:
			const snippets = await SnippetRoot.loadSnippetsFromCache();
			// *Updating the store:
			context.commit('setSnippets', snippets);
		}
	}
};
