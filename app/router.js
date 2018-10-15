import Vue from 'vue'
import VueRouter from 'vue-router'

// *Getting the pages components:
import LoadingPage from './loading'
import IndexPage   from './index'

// *Getting the pages' view components:
import ConnectionsView   from './connection/list/v-connections-view'
import NewConnectionView from './connection/create/v-connection-creator-view'
import QueuesView        from './queue/list/v-queues-view'
import SendMessageView   from './message/send/v-message-sender-view'



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
            { name: 'connections',     path: 'connections',                                           component: ConnectionsView },
            { name: 'new-connection',  path: 'connections/new',                                       component: NewConnectionView },
            // { name: 'edit-connection', path: 'connections/:conn_name/edit',                             component: EditConnectionView },
            { name: 'queues',          path: 'connections/:conn_name/queues',                         component: QueuesView },
            // { name: 'new-queue',       path: 'connections/:conn_name/queues/new',                       component: NewQueueView },
            // { name: 'messages',        path: 'connections/:conn_name/queues/:queue_name/messages',      component: MessagesView },
            { name: 'send-message',    path: 'connections/:conn_name/queues/:queue_id/messages/send', component: SendMessageView },
            // { name: 'inspect-message', path: 'connections/:conn_name/queues/:queue_name/messages/:msg_id',      component: InspectMessageView },

         ]
      }
   ]
});

// *Handling first navigation:
router.beforeEach((to, from, next) => {
   // *Checking if the user came to the application manually (and not from the loading page):
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
