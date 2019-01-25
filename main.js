import Vue from 'vue'

import App          from './app/app.vue'
import router       from './app/router'
import store        from './app/store'
import                   './infra/plugins/id'
import                   './infra/style/material'
import                   './infra/style/vuetify/loader'
import * as updates from './data/update-migration/migration'


Vue.config.productionTip = true;


(async () => {

   await updates.execute();


   new Vue({
      router,
      store,
      render: h => h(App)
   }).$mount('#application');


})();
