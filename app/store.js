import Vue from 'vue'
import Vuex from 'vuex'

import connection_module  from './connection/store'
import queue_module       from './queue/store'
import message_module     from './message/store'
import ui_messages_module from './ui-messages/store'

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      'connection':  connection_module,
      'queue':       queue_module,
      'message':     message_module,
      'ui-messages': ui_messages_module
   }
});
