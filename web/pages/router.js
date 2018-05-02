import Vue from 'vue'
import VueRouter from 'vue-router'

// *Getting the pages components:
import LoadingPage from './loading'
import IndexPage   from './index'
import ListConnections from '../views/list-connections'
import ListQueues from '../views/list-queues'


// *Registering vue-router:
Vue.use(VueRouter);

// *Building and exporting the router:
export default new VueRouter({
   mode: 'history',
   routes: [
      {
         name: 'loading',
         path: '/loading',
         component: LoadingPage
      },
      {
         name: 'index',
         path: '/index',
         component: IndexPage,
         children: [
            { path: 'connections', component: ListConnections },
            { path: 'connections/:conn_name/queues', component: ListQueues }
         ]
      }
   ]
});
