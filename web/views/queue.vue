<template>
   <div class="queue-view">
      <template v-if="getSelectedQueue()">
         <h1>Send a message</h1>
         <form class="-send-message-form">
            <input type="text" placeholder="Correlation ID" v-model="form.correlation_id"/>
            <textarea rows="20" cols="80" v-model="form.message"></textarea>
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
</style>
