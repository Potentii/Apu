<template>
   <div class="connection-view">
      <template v-if="getSelectedConnection()">
         <router-link
            class="-item"
            tag="button"
            :to="'/index/connections/' + getSelectedConnection().name + '/edit'">
            Edit
         </router-link>

         <h1>Queues</h1>

         <list-queues :conn="getSelectedConnection()"/>
      </template>
      <template v-else>
         Loading connection info...
      </template>
   </div>
</template>



<script>
import { mapGetters, mapMutations } from 'vuex'
import ListQueues from '../compositions/list-queues'

export default {

   name: 'connection-view',

   components: {
      'list-queues': ListQueues
   },

   data(){
      return { };
   },

   computed: {
      ...mapGetters([
         'getSavedConnections',
         'getSelectedConnection'
      ])
   },

   beforeMount(){
      this.load();
   },

   methods: {
      ...mapMutations([
         'setSelectedConnection'
      ]),

      load(){
         // *Getting the connection name from the navigation parameter:
         const conn_name = this.$route.params.conn_name;

         const conn = this.getSavedConnections().find(c => c.name === conn_name);
         
         if(conn)
            this.setSelectedConnection(conn);
         else
            this.setSelectedConnection(null);

         // *Checking if the user have selected a valid connection:
         if(!this.getSelectedConnection()){
            // *If it doesn't:
            // *Emitting an error event:
            this.$emit('error', new Error(`Connection "${conn_name}" not found`));
            // *Sending the user back to the connections selection page:
            this.$router.replace('/connections');
         }
      }
   }

}
</script>



<style>
</style>
