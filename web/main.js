import Vue from 'vue'
import router from './pages/router'
import store from './state/store'

Vue.config.productionTip = false;

new Vue({
   el: 'app',
   router,
   store
});
