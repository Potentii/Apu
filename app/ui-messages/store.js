import UIMessage from './ui-message'

export default {
   namespaced: true,


   state: {
      messages: []
   },


   getters: { },


   mutations: {
      _addMessage(state, new_message){
         if(!new_message.date)
            new_message.date = new Date().getTime();
         state.messages.push(new_message);
      },

      _removeMessage(state, message){
         const index_to_remove = state.messages.findIndex(m => m.date === message.date);
         if(index_to_remove > -1)
            state.messages.splice(index_to_remove, 1);

         message.removeAllListeners();
      }
   },


   actions: {
      /**
       * Queues a new message to be shown to the user
       * @param {UIMessage} new_message The message to be displayed
       */
      addMessage({ commit }, new_message){
         if(!(new_message instanceof UIMessage))
            throw new TypeError(`Invalid UI message type`);

         new_message.once(UIMessage.ACTION.DISMISS, () => {
            commit('_removeMessage', new_message);
         });

         commit('_addMessage', new_message);

         setTimeout(() => {
            new_message.emit(UIMessage.ACTION.DISMISS);
         }, new_message.life || 8000);
      }
   }
};
