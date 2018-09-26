<template>
   <div class="v-queues-view">

      <h1 class="-view-section-title">Queues</h1>

      <template v-if="!loading && queues && queues.length">
         <v-queues-list :queues="queues" :connectionname="selected_saved_connection.name"/>
      </template>

      <template v-if="loading">
         Loading queues...
      </template>

      <template v-if="!loading && (!queues || !queues.length)">
         No queues found
      </template>

   </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import QueuesList from './v-queues-list'
import ConnectionResolverMixin from '/app/connection/v-connection-resolver-mixin'
import UIMessage from '/app/ui-messages/ui-message'
import * as ipc from './ipc'
import TimeoutError from '/infra/timeout-error'

export default {

   name: 'v-queues-view',

   mixins: [
      ConnectionResolverMixin
   ],

   components: {
      'v-queues-list': QueuesList
   },

   data(){
      return {
         loading: false,
         queues: []
      };
   },

   computed: {
      ...mapState('connection', [ 'selected_saved_connection' ])
   },

   beforeMount(){
      this.refreshQueues();
   },

   methods: {
      ...mapActions('ui-messages', { 'addUIMessage': 'addMessage' }),

      refreshQueues(){
         this.loading = true;

         if(!this.selected_saved_connection){
            this.queues = [];
            this.loading = false;
            return;
         }

         ipc.loadQueuesFromConnection(this.selected_saved_connection.data)
            .then(queues => this.queues = queues)
            .catch(err => {
               if(err instanceof TimeoutError){
                  this.addUIMessage(new UIMessage(UIMessage.ERROR, `The MQ server took too long to respond`));
               } else if(err.reasonCode == 2538){
                  // Cannot connect to MQ
                  this.addUIMessage(new UIMessage(UIMessage.ERROR, `Could not connect to the MQ server (ERROR 2538)`));
               } else{
                  this.addUIMessage(new UIMessage(UIMessage.ERROR, `Unexpected error (${err.message})`));
                  console.error(err);
               }
            })
            .then(() => this.loading = false);
      }
   }

}
</script>



<style>
.v-queues-view{
   height: 100%;
}
.v-queues-view > .v-queues-list{
   margin-top: 1rem;
   margin-bottom: 4rem;
}
</style>
