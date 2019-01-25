<template>
   <div class="v-message-sender-view">

      <template v-if="selected_saved_connection && selected_queue">

         <div class="-view-section-title">
            <span>New message</span>
            <div class="-snippets">

               <div class="v-snippets-combobox">
                  <!--<v-combobox-->
                     <!--v-model="selected_snippet"-->
                     <!--:items="snippets"-->
                     <!--label="Snippet"-->
                     <!--solo></v-combobox>-->
               </div>
            </div>
         </div>

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
            <button class="fab --raised" :form="$refs.form ? $refs.form.id : null" :disabled="states.is('sending') || !valid">
               <i class="material-icons" v-if="states.not('sending')">send</i>
               <span class="-spinner" v-else><md-progress-spinner md-mode="indeterminate" :md-diameter="28" :md-stroke="3"></md-progress-spinner></span>
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
import ConnectionResolverMixin  from '/app/connection/v-connection-resolver-mixin'
import QueueResolverMixin       from '/app/queue/v-queue-resolver-mixin'
import UIMessage                from '/app/ui-messages/ui-message'
import Message                  from '../message'
import * as ipc                 from './ipc'
import TimeoutError             from '/infra/timeout-error'
import States                   from '../../../infra/states/states';



export default {

   name: 'v-message-sender-view',


   mixins: [
      ConnectionResolverMixin,
      QueueResolverMixin
   ],


   data(){
      return {
			selected_snippet: null,
         snippets: [
         	'oi1', 'oi2', 'oi3'
         ],
      	states: new States(),
         form: {
            correlation_id: '',
            message: ''
         }
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
		...mapActions('queue', [ 'setQueueAsUsedNow' ]),



      async _onSubmit(){
			this.states.remove('error');
         this.states.add('sending');

         const message = new Message(
            this.selected_queue.name,
            this.form.correlation_id,
            this.form.message
         );

         try{
         	// *Sending the message to the queue:
				await ipc.sendMessage(this.selected_saved_connection.data, message);
				// *Setting this queue as used now:
				this.setQueueAsUsedNow(this.selected_queue);
				// *Showing a success message to the user:
				this.addUIMessage(new UIMessage(UIMessage.INFO, `Message sent`));
			} catch(err){
				this.states.add('error');
				if(err instanceof TimeoutError){
					this.addUIMessage(new UIMessage(UIMessage.ERROR, `The MQ server took too long to respond`));
				} else{
					this.addUIMessage(new UIMessage(UIMessage.ERROR, `An error happened:`, `${err.message}`, 12000));
					console.error(err);
				}
			} finally{
				this.states.remove('sending');
         }
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
   font-family: 'Roboto Mono', monospace;
}
.v-message-sender-view > .-send-message-form > .field > .-input.-message{
   /*white-space: pre-wrap;*/
   white-space: nowrap;
   resize: vertical;
   min-height: 10em;
   height: 20em;
   font-size: 0.9em;
   line-height: 1.7em;
}

.v-message-sender-view > .fab-list > .fab > .-spinner{
   display: flex;
   align-content: center;
}
.v-message-sender-view > .fab-list > .fab > .-spinner .md-progress-spinner{
   --md-theme-default-primary: var(--m-grey-100);
}
</style>
