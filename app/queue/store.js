import QueueVO      from './queue-vo';
import QueueRoot    from './queue-root';



export default {
   namespaced: true,


   state: {
      /**
       * The queue selected by the user
       * @type {QueueVO}
       */
      selected_queue: null,


		/**
       * @type {QueueVO[]}
		 */
		queues: [],
		/**
		 * @type {String[]}
		 */
		loaded_connections_ids: [],


		/**
		 * @type {Number}
		 */
      max_used_queues_for_connection: 5
   },


   getters: {
		getQueueById: state => id => state.queues.find(queue => queue._id === id),

   	isConnectionQueuesLoaded: state => connection => state.loaded_connections_ids.some(id => id === connection._id),

		getQueuesOfConnection: state => connection => state.queues.filter(queue => queue.connection_id === connection._id),

		getLastUsedQueuesOfConnection: state => connection => {
			return state.queues
				.filter(queue => queue.connection_id === connection._id && !!queue.last_use)
				.sort((q1, q2) => q1.last_use - q2.last_use)
				.slice(0, state.max_used_queues_for_connection);
		},

		getStarredQueuesOfConnection: state => connection => state.queues.filter(queue => queue.connection_id === connection._id && !!queue.starred),
   },


   mutations: {
		setQueues(state, queues){
			if(!Array.isArray(queues) || !queues.every(queue => queue instanceof QueueVO))
				throw new TypeError(`The "cached queues" must be an array of QueueVO`);
			state.queues = queues;
		},

		markConnectionAsLoaded(state, connection){
			if(!state.loaded_connections_ids.some(id => id === connection._id))
				state.loaded_connections_ids.push(connection.id);
		},
		markConnectionAsNotLoaded(state, connection){
			const index = state.loaded_connections_ids.findIndex(id => id === connection._id);
			if(index > -1)
				state.loaded_connections_ids.splice(index, 1);
		},

      clearSelectedQueue(state){
         state.selected_queue = null;
      },
      setSelectedQueue(state, queue){
         if(!(queue instanceof QueueVO))
            throw new TypeError(`The "selected queue" must be a QueueVO`);

         state.selected_queue = queue;
      }
   },


   actions: {
   	async updateQueues(context, queues){
			// *Updating the cache:
			await QueueRoot.saveQueuesOnCache(queues);
			// *Updating the store:
			context.commit('setQueues', queues);
		},

   	async refreshQueuesOfConnectionFromMQ(context, connection){
   		// *Getting the already known queues:
   		const known_queues = context.state.queues.concat([]);
   		// *Removing the queues from this connection:
			const refreshed_queues = context.state.queues.filter(queue => queue.connection_id !== connection._id);
			// *Adding the new queues from server for this connection:
			refreshed_queues.push(...(await QueueRoot.loadQueuesFromMQ(connection, known_queues)));
			// *Marking this connection as loaded:
			context.commit('markConnectionAsLoaded', connection);
			// *Updating the application state and cache:
			await context.dispatch('updateQueues', refreshed_queues);
		},

      async setQueueAsUsedNow(context, queue){
			// *Getting the already known queues:
			const known_queues = context.state.queues.concat([]);
			const found_queue = known_queues.find(known_queue => known_queue._id === queue._id);
			if(!found_queue)
				return;

			found_queue.last_use = Date.now();

			// *Updating the application state and cache:
			await context.dispatch('updateQueues', known_queues);
      },


      async starQueue(context, queue){

      },


      async unstarQueue(context, queue){

      }
   }
};
