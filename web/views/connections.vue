<template>
   <div class="connection-view">
      <h1>Connections</h1>
      <list-connections :conns="getSavedConnections()"/>
   </div>
</template>



<script>
import { mapGetters, mapMutations } from 'vuex'
import ListConnections from '../compositions/list-connections'

export default {

   name: 'connections-view',

   components: {
      'list-connections': ListConnections
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
         'setSelectedConnection',
         'setSelectedQueue'
      ]),

      load(){
         // *Cleaning the selected connection and queue:
         this.setSelectedQueue(null);
         this.setSelectedConnection(null);
      }
   }

}
</script>



<style>
</style>
