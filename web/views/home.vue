<template>
   <div class="connection-view">
      <h1>Connections</h1>
      <list-connections :conns="getSavedConnections()"/>
   </div>
</template>



<script>
import { mapGetters, mapMutations } from 'vuex'
import Connection from '../types/connection'
import ListConnections from '../compositions/list-connections'

export default {

   name: 'home-view',

   components: {
      'list-connections': ListConnections
   },

   data(){
      return { };
   },

   computed: {
      ...mapGetters([
         'getSavedConnections'
      ])
   },

   beforeMount(){
      this.load();
   },

   methods: {
      ...mapMutations([
         'clearSavedConnections',
         'addSavedConnection',
         'setSelectedConnection'
      ]),

      load(){
         // TODO initialize the saved connections in another place
         // TODO for every newly visited route, redirect to the loading screen
         this.clearSavedConnections();

         [
            new Connection('conn1', '127.1.1.0', 1234, 'ABC', 'chann-123'),
            new Connection('conn2', '127.1.1.0', 1234, 'ABC', ''),
            new Connection('conn3', '127.1.1.0', 1234, 'ABC', ''),
            new Connection('conn4', '127.1.1.0', 1234, 'ABC', 'chann-456')
         ].forEach(c => this.addSavedConnection(c));

      }
   }

}
</script>



<style>
</style>
