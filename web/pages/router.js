import Vue from 'vue'
import VueRouter from 'vue-router'

// *Getting the pages components:
import LoadingPage from './loading'
import IndexPage   from './index'

// *Getting the pages' view components:
import NewConnection from '../views/new-connection'
import Connections   from '../views/connections'
import Connection    from '../views/connection'
import Queue         from '../views/queue'


// *Registering vue-router:
Vue.use(VueRouter);


// *Building the router:
const router = new VueRouter({
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
            { name: 'connections',    path: 'connections',                               component: Connections },
            { name: 'new-connection', path: 'connections/new',                           component: NewConnection },
            { name: 'connection',     path: 'connections/:conn_name',                    component: Connection },
            { name: 'queue',          path: 'connections/:conn_name/queues/:queue_name', component: Queue }
         ]
      }
   ]
});


router.beforeEach((to, from, next) => {
   // *Checking if the user came to the application manually (and not to the loading page):
   if(from.name === null && to.name === null)
      // *If they did, and navigated to the root/unknown page:
      // *Redirecting to the loading page:
      next({ name: 'loading' });
   else if(from.name === null && to.name !== 'loading')
      // *If they did, and navigated to an specific page:
      // *Redirecting to the loading page, so all the needed info will be loaded into the application:
      next({ name: 'loading', replace: true, params: { redirect_to: to } });
   else
      // *If they didn't:
      // *Proceeding to the next middleware:
      next();
});


export default router;
