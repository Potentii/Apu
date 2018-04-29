import Vue from 'vue'
import VueRouter from 'vue-router'

// *Getting the pages components:
import LoadingPage from './loading.vue'

// *Registering vue-router:
Vue.use(VueRouter);

console.log(LoadingPage);

// *Building and exporting the router:
export default new VueRouter({
   mode: 'history',
   routes: [
      {
         name: 'loading',
         path: '/',
         component: LoadingPage
      }
   ]
});
