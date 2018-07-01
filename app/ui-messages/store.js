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
      }
   },


   actions: {
      addMessage({ commit }, new_message){
         commit('_addMessage', new_message);
         setTimeout(() => {
            commit('_removeMessage', new_message);
         }, new_message.life || 8000);
      }
   }
};
