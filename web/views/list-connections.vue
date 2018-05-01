<template>
   <div class="list-connections-view">
      <ul class="-list">
         <li class="-item" v-for="conn in getSavedConnections()">
            <span class="-location">
               <span class="-manager">{{ conn.queue_manager }}</span>
               <span class="-on"> on </span>
               <span class="-host">{{ conn.host }}</span>
               <span class="-colon">:</span>
               <span class="-port">{{ conn.port }}</span>
            </span>
            <span class="-name">{{ conn.name }}</span>
         </li>
      </ul>
   </div>
</template>



<script>
import { mapGetters, mapMutations } from 'vuex'

export default {

   name: 'list-connections-view',

   data(){
      return {};
   },

   computed: {
      ...mapGetters([
         'getSavedConnections'
      ])
   },

   mounted(){
   },

   methods: {
      ...mapMutations([
         'addSavedConnection'
      ]),

      loadSavedConnections(){
         this.addSavedConnection(new SavedConnection());
      },

      load(){

      }
   }

}
</script>



<style>
.list-connections-view > .-list > .-item{
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: 1fr 1fr;
   grid-template-areas:
      'location'
      'name';
}
.list-connections-view > .-list > .-item > .-location{
   grid-area: location;
}
.list-connections-view > .-list > .-item > .-name{
   grid-area: name;
}
</style>
