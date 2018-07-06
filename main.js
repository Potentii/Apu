import Vue from 'vue'

import App      from './app/app.vue'
import router   from './app/router'
import store    from './app/store'
import id       from './infra/plugins/id'
import material from './infra/style/material'

Vue.config.productionTip = true;

new Vue({
   router,
   store,
   render: h => h(App)
}).$mount('#app');
