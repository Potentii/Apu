import Vue from 'vue'
import VueRouter from 'vue-router'

// *Getting the pages components:
import LoadingPage from './loading'
import IndexPage   from './index'
import Home from '../views/home'
import Connection from '../views/connection'


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
            { path: 'connections', component: Home },
            { path: 'connections/:conn_name', component: Connection }
         ]
      }
   ]
});

router.beforeEach((from, to, next) => {
   if(from === null && to.namd !== 'loading')
      next({ name: 'loading', replace: true, params: { redirect_to: to } })
   else
      next();

});

export default router;
