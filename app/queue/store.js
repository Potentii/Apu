import Queue from './saved-queue'

export default {
   namespaced: true,


   state: {
      /**
       * The queue selected by the user
       * @type {Queue}
       */
      selected_queue: null
   },


   getters: { },


   mutations: {
      clearSelectedQueue(state){
         state.selected_queue = null;
      },

      setSelectedQueue(state, queue){
         if(!(queue instanceof Queue))
            throw new TypeError(`The "selected queue" must be a Queue`);

         state.selected_queue = queue;
      }
   },


   actions: { }
};
