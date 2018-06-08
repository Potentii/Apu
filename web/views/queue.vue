<template>
   <div class="queue-view">

      <template v-if="getSelectedConnection() && getSelectedQueue()">
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
            <button class="fab --raised" :form="$refs.form ? $refs.form.id : null" :disabled="!valid">
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
import { mapGetters, mapMutations } from 'vuex'
import Queue from '../types/queue'
import * as ipc from '../tools/ipc'


export default {

   name: 'queue-view',

   data(){
      return {
         form: {
            correlation_id: '',
            message: ''
         }
      };
   },

   computed: {
      ...mapGetters([
         'getSavedConnection',
         'getSavedConnections',
         'getSelectedConnection',
         'getSelectedQueue'
      ]),

      valid(){
         return !!this.form.message && !!this.form.message.trim();
      }
   },

   beforeMount(){
      this.load();
   },

   methods: {
      ...mapMutations([
         'setSelectedConnection',
         'setSelectedQueue'
      ]),

      load(){
         // *Getting the connection name from the navigation parameter:
         const conn_name = this.$route.params.conn_name;

         // *Setting the selected connection as the current one (if it's a valid connection):
         this.setSelectedConnection(this.getSavedConnection(conn_name));

         // *Checking if the user have selected a valid connection:
         if(!this.getSelectedConnection()){
            // *If it doesn't:
            // *Emitting an error event:
            this.$emit('message', new Error(`Connection "${conn_name}" not found`));
            // *Sending the user back to the connections selection page:
            this.$router.push({ name: 'connections' });
         } else{
            // *Getting the queue name from the navigation parameter:
            const queue_name = this.$route.params.queue_name;

            if(queue_name)
               this.setSelectedQueue(new Queue(queue_name));
            else
               this.setSelectedQueue(null); // TODO error
         }

      },


      _onSubmit(){
         if(!this.getSelectedConnection() || !this.getSelectedQueue())
            throw new Error('Invalid application state'); // TODO

         const connection = this.getSelectedConnection();
         const queue = this.getSelectedQueue();

         const data = {
            connection: {
               host:         connection.host,
               port:         connection.port,
               queueManager: connection.queue_manager,
               channel:      connection.channel,
               username:     connection.username,
               password:     connection.password
            },
            message: {
               queueName:     queue.name,
               correlationId: this.form.correlation_id,
               body:          this.form.message
            }
         };

         ipc.send('messages:send', data, 10000)
            .then(res => {
               console.log(res);
               // TODO handle response
            })
            .catch(err => {
               // if(err instanceof ipc.TimeoutError)
               // TODO display message to user
            });
      }
   }

}
</script>



<style>
.queue-view > .-send-message-form{
   display: grid;
   grid-row-gap: 1.5em;
   grid-template-areas:
      'corr-id'
      'message';
   padding: 1rem var(--h-padding) 4rem var(--h-padding);
}

.queue-view > .-send-message-form > .field > .-input.-corr-id,
.queue-view > .-send-message-form > .field > .-input.-message{
   font-family: 'Roboto Mono';
}
.queue-view > .-send-message-form > .field > .-input.-message{
   white-space: nowrap;
   resize: vertical;
   min-height: 10em;
   height: 20em;
   font-size: 0.9em;
}
</style>
