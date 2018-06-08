<template>
   <div class="list-queues">
      <div class="-on-loading" v-if="loading">
         Loading...
      </div>
      <div class="-on-empty" v-if="!loading && !queues.length">
         No queues found
      </div>
      <ul class="-list" v-if="!loading && queues.length">
         <router-link
            class="-item"
            tag="li"
            :to="'/index/connections/' + conn.name + '/queues/' + queue.name"
            v-for="queue in queues">
            <div class="-container">
               <span class="-name">{{ queue.name }}</span>
            </div>
         </router-link>
      </ul>
   </div>
</template>



<script>
import { mapActions } from 'vuex'
import Connection from '../types/connection'
import Queue from '../types/queue'
import * as ipc from '../tools/ipc'

export default {

   name: 'list-queues',

   props: {
      'conn': {
         type: Connection,
         required: true
      }
   },

   data(){
      return {
         loading: false,
         queues: []
      };
   },

   beforeMount(){
      this.load();
   },

   methods: {
      ...mapActions({
         'addUIMessage': 'ui-messages/addMessage'
      }),

      loadQueues(){
         this.loading = true;

         const connection = {
            host:         this.conn.host,
            port:         this.conn.port,
            queueManager: this.conn.queue_manager,
            channel:      this.conn.channel,
            username:     this.conn.username,
            password:     this.conn.password
         };

         ipc.send('queues:list', { connection }, 10000)
            .then(res => {
               this.loading = false;

               const queues_names = res.data.filter(name => !/^AMQ\..+$/.test(name)).map(name => new Queue(name));
               this.queues = queues_names;
            })
            .catch(err => {
               this.loading = false;

               if(err instanceof ipc.TimeoutError){
                  this.addUIMessage({
                     severity: 'ERROR',
                     content: 'The MQ server took too long to respond'
                  });
               } else if(err.reasonCode){
                  if(err.reasonCode == 2538){
                     // Cannot connect to MQ
                     this.addUIMessage({
                        severity: 'ERROR',
                        content: 'Could not connect to the MQ server'
                     });
                  }
               } else{
                  // TODO display message to user
                  console.error(err);

               }
            });
      },

      load(){
         try{
            this.loadQueues();
         } catch(err){
            console.error(err);
         }
      }
   }

}
</script>



<style>
.list-queues > .-list{
   border-radius: 3px;
   overflow: hidden;
   background-color: var(--m-grey-50);
   margin: 0 var(--h-padding) 1em var(--h-padding);
   box-shadow: 0 3px 2px -1px rgba(0, 0, 0, 0.1);
}

.list-queues > .-list > .-item{
   padding: 0.8em 1em;
   transition: background-color 0.2s ease;
} .list-queues > .-list > .-item:hover{
   cursor: pointer;
   background-color: var(--m-grey-100);
}
.list-queues > .-list > .-item::before{
   content: '';
   position: absolute;
   width: 100%;
   height: 1px;
   bottom: 0;
   left: 0;
   background-color: var(--m-grey-200);
   transition: opacity 0.2s ease;
}

.list-queues > .-list > .-item > .-container > .-name{
   font-size: 1em;
   text-transform: uppercase;
   letter-spacing: 0.02em;
}
</style>
