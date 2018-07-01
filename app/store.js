import Vue from 'vue'
import Vuex from 'vuex'

// *Getting the store components:
import state     from './state'
import mutations from './mutations'
import getters   from './getters'
import actions   from './actions'

import connection_module  from './connection/store'
import queue_module       from './queue/store'
import message_module     from './message/store'
import ui_messages_module from './ui-messages/store'

Vue.use(Vuex);

export default new Vuex.Store({
   // state,
   // mutations,
   // getters,
   // actions,

   mutations: {
      markAsLoaded(state){
         // state.loaded = true;
      }
   },

   modules: {
      'connection':  connection_module,
      'queue':       queue_module,
      'message':     message_module,
      'ui-messages': ui_messages_module
   }
});
