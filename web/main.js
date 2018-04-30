import Vue from 'vue'

import App    from './app.vue'
import router from './pages/router'
import store  from './state/store'

Vue.config.productionTip = true;

new Vue({
   router,
   store,
   render: h => h(App)
}).$mount('#app');

router.replace('loading');
