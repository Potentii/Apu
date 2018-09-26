<template>
   <div class="v-message-sender-view">

      <template v-if="selected_saved_connection && selected_queue">
         <h1 class="-view-section-title">New message</h1>

         <form class="-send-message-form" ref="form" v-id @submit.prevent="_onSubmit">

            <div class="field">
               <label class="-label">Correlation ID</label>
               <input class="-input -corr-id" type="text" v-model="form.correlation_id"/>
            </div>

            <div class="field">
               <label class="-label">Message</label>
               <textarea class="-input -message" v-model="form.message"></textarea>
            </div>

         </form>

         <!-- * FABs list * -->
         <ul class="fab-list">
            <!-- * Send message FAB * -->
            <button class="fab --raised" :form="$refs.form ? $refs.form.id : null" :disabled="sending || !valid">
               <i class="material-icons">send</i>
            </button>
         </ul>
      </template>

      <template v-else>
         Loading queue info...
      </template>

   </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import ConnectionResolverMixin from '/app/connection/v-connection-resolver-mixin'
import QueueResolverMixin from '/app/queue/v-queue-resolver-mixin'
import UIMessage from '/app/ui-messages/ui-message'
import Message from '../message'
import * as ipc from './ipc'
import TimeoutError from '/infra/timeout-error'


export default {

   name: 'v-message-sender-view',


   mixins: [
      ConnectionResolverMixin,
      QueueResolverMixin
   ],


   data(){
      return {
         form: {
            correlation_id: '',
            message: ''
         },
         sending: false
      };
   },


   computed: {
      ...mapState('connection', [ 'selected_saved_connection' ]),
      ...mapState('queue', [ 'selected_queue' ]),

      valid(){
         return !!this.form.message && !!this.form.message.trim();
      }
   },

   methods: {
      ...mapActions('ui-messages', { 'addUIMessage': 'addMessage' }),

      _onSubmit(){
         this.sending = true;

         const message = new Message(
            this.selected_queue.name,
            this.form.correlation_id,
            this.form.message
         );

         ipc.sendMessage(this.selected_saved_connection.data, message)
            .then(res => {
               this.addUIMessage(new UIMessage(UIMessage.INFO, `Message sent`));
            })
            .catch(err => {
               if(err instanceof TimeoutError){
                  this.addUIMessage(new UIMessage(UIMessage.ERROR, `The MQ server took too long to respond`));
               } else{
                  this.addUIMessage(new UIMessage(UIMessage.ERROR, `Unexpected error (${err.message})`));
                  console.error(err);
               }
            })
            .then(() => {
               this.sending = false;
            })
      }
   }

}
</script>



<style>
.v-message-sender-view > .-send-message-form{
   display: grid;
   grid-row-gap: 1.5em;
   grid-template-areas:
      'corr-id'
      'message';
   padding: 1rem var(--h-padding) 6rem var(--h-padding);
}

.v-message-sender-view > .-send-message-form > .field > .-input.-corr-id,
.v-message-sender-view > .-send-message-form > .field > .-input.-message{
   font-family: 'Roboto Mono';
}
.v-message-sender-view > .-send-message-form > .field > .-input.-message{
   white-space: pre-wrap;
   resize: vertical;
   min-height: 10em;
   height: 20em;
   font-size: 0.9em;
   line-height: 1.7em;
}
</style>
