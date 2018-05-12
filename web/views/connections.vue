<template>
   <div class="connections-view">
      <h1 class="-view-section-title">Connections</h1>
      <list-connections :conns="getSavedConnections()"/>
      <ul class="fab-list">
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


.connections-view{
   --fab-background-color: #d23;
   --fab-foreground-color: #FAFAFA;
}

.fab-list{
   display: flex;
   flex-direction: column-reverse;
   align-items: center;
   position: fixed;
   bottom: 1rem;
   right: 1rem;
}

.fab{
   width: 4.5em;
   height: 4.5em;
   background-color: var(--fab-background-color);
   color: var(--fab-foreground-color);
   border-radius: 50%;
}
.fab-list > .fab{
   margin-top: 1rem;
}
.fab-list > .fab:not(:first-child){
   width: 3.2em;
   height: 3.2em;
}

.fab.--raised{
   box-shadow: 0 4px 2px -1px rgba(0, 0, 0, 0.15);
   transition: box-shadow 0.15s ease;
} .fab.--raised:hover{
   box-shadow: 0 8px 4px -3px rgba(0, 0, 0, 0.3);
   transition: box-shadow 0.2s ease-out;
} .fab.--raised:active{
   box-shadow: 0 6px 4px -3px rgba(0, 0, 0, 0.2);
   transition: box-shadow 0.1s ease-in;
}

.fab > .material-icons{
   font-size: 1.4rem;
}
</style>
