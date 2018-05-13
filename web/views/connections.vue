<template>
   <div class="connections-view">

      <!-- * View main title * -->
      <h1 class="-view-section-title">Connections</h1>

      <!-- * Connections listing * -->
      <list-connections :conns="getSavedConnections()"/>

      <!-- * FABs list * -->
      <ul class="fab-list">
         <!-- * New connection form FAB * -->
         <router-link class="fab --raised" tag="button" :to="{ name: 'new-connection' }">
            <i class="material-icons">add</i>
         </router-link>
      </ul>

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
.connections-view > .list-connections{
   padding-top: 1rem;
   padding-bottom: 4rem;
}
</style>
