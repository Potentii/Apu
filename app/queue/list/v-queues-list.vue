<template>
   <div class="v-queues-list">
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
            :to="'/index/connections/' + connection.name + '/queues/' + queue.name + '/messages/send'"
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
import SavedConnection from '/app/connection/saved-connection'
import Queue from '../saved-queue'
import * as ipc from './ipc'
import TimeoutError from '/infra/timeout-error'

export default {

   name: 'v-queues-list',

   props: {
      'connection': {
         type: SavedConnection,
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
      this.loading = true;

      ipc.loadQueuesFromConnection(this.connection.data)
         .then(queues => this.queues = queues)
         .catch(err => {
            if(err instanceof TimeoutError){
               this.addUIMessage({
                  severity: 'ERROR',
                  content: `The MQ server took too long to respond`
               });
            } else if(err.reasonCode == 2538){
               // Cannot connect to MQ
               this.addUIMessage({
                  severity: 'ERROR',
                  content: `Could not connect to the MQ server (ERROR 2538)`
               });
            } else{
               this.addUIMessage({
                  severity: 'ERROR',
                  content: `Unexpected error (${err.message})`
               });
               console.error(err);
            }
         })
         .then(() => this.loading = false);
   },

   methods: {
      ...mapActions('ui-messages', {
         'addUIMessage': 'addMessage'
      })
   }

}
</script>



<style>
.v-queues-list > .-list{
   border-radius: 3px;
   overflow: hidden;
   background-color: var(--m-grey-50);
   margin: 0 var(--h-padding) 1em var(--h-padding);
   box-shadow: 0 3px 8px -1px rgba(0, 0, 0, 0.1);
}

.v-queues-list > .-list > .-item{
   padding: 0.8em 1em;
   transition: background-color 0.2s ease;
} .v-queues-list > .-list > .-item:hover{
   cursor: pointer;
   background-color: var(--m-grey-100);
}
.v-queues-list > .-list > .-item::before{
   content: '';
   position: absolute;
   width: 100%;
   height: 1px;
   bottom: 0;
   left: 0;
   background-color: var(--m-grey-200);
   transition: opacity 0.2s ease;
}

.v-queues-list > .-list > .-item > .-container > .-name{
   font-size: 1em;
   text-transform: uppercase;
   letter-spacing: 0.02em;
}
</style>
