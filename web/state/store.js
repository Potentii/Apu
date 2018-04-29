import Vue from 'vue'
import Vuex from 'vuex'

// *Getting the store components:
import state     from './state'
import mutations from './mutations'
import getters   from './getters'
import actions   from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
   state,
   mutations,
   getters,
   actions
});
