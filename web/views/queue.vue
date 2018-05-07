<template>
   <div class="queue-view">

      <template v-if="getSelectedConnection() && getSelectedQueue()">
         <h1 class="-view-section-title">New message</h1>
         <form class="-send-message-form">

            <label class="-label">Correlation ID</label>
            <input class="-input -corr-id" type="text" v-model="form.correlation_id"/>

            <label class="-label">Message</label>
            <textarea class="-input -message" v-model="form.message"></textarea>

         </form>
      </template>

      <template v-else>
         Loading queue info...
      </template>

   </div>
</template>



<script>
import { mapGetters, mapMutations } from 'vuex'
import Queue from '../types/queue'

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
      ])
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
         }

         // *Getting the queue name from the navigation parameter:
         const queue_name = this.$route.params.queue_name;

         if(queue_name)
            this.setSelectedQueue(new Queue(queue_name));
         else
            this.setSelectedQueue(null);
      }
   }

}
</script>



<style>
.queue-view > .-send-message-form{
   display: flex;
   flex-direction: column;
   padding: 1rem var(--h-padding) 4rem var(--h-padding);
}

.queue-view > .-send-message-form > .-label{
   font-size: 0.9em;
   color: var(--m-grey-700);
   margin-bottom: 0.6em;
}

.queue-view > .-send-message-form > .-input{
   font-size: 0.8em;
   padding: 0.6em 1em;
   background-color: var(--m-grey-50);
   border-radius: 2px;
   margin-bottom: 2em;
   box-shadow: 0 3px 2px -1px rgba(0, 0, 0, 0.06);

   transition: box-shadow 0.2s ease;
} .queue-view > .-send-message-form > .-input:hover{
   box-shadow: 0 4px 3px -1px rgba(0, 0, 0, 0.2);
} .queue-view > .-send-message-form > .-input:focus{
   box-shadow: 0 3px 2px -1px rgba(0, 0, 0, 0.13);
}

.queue-view > .-send-message-form > .-input.-message{
   white-space: nowrap;
   resize: vertical;
   min-height: 10em;
   height: 25em;
}
.queue-view > .-send-message-form > .-input.-corr-id,
.queue-view > .-send-message-form > .-input.-message{
   font-family: 'Roboto Mono';
}
</style>
