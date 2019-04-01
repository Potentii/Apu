import Vue from 'vue'

import App          from './app/app.vue'
import router       from './app/router'
import store        from './app/store'
import DialogPlugin from '/infra/ui/dialog/plugin'
import                   './infra/plugins/id'
import                   './infra/plugins/vue-shortkey'
import                   './infra/style/vue-material/loader'
import                   './infra/style/vuetify/loader'

const cache = nodeRequire('@potentii/app-data');

Vue.config.productionTip = false;

Vue.use(DialogPlugin, { store });

(async () => {
   cache.setAppName('Apu');

   new Vue({
      router,
      store,
      render: h => h(App)
   }).$mount('#application');
})();
