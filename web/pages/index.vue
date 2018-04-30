<template>
   <div class="index-page">

      <!-- * Navigation breadcrumb * -->
      <nav class="-nav">

         <!-- * Connection selection link * -->
         <router-link class="-item" to="/index/connections">
            {{ getSelectedConnection() ? getSelectedConnection().name : 'Connections' }}
         </router-link>

         <!-- * Queue selection link * -->
         <template v-if="getSelectedConnection()">
            <i class="-arrow material-icons">keyboard_arrow_right</i>
            <router-link class="-item" to="/index/queues">
               {{ getSelectedQueue() ? getSelectedQueue().name : 'Queue' }}
            </router-link>
         </template>

         <!-- * New message form link * -->
         <template v-if="getSelectedQueue()">
            <i class="-arrow material-icons">keyboard_arrow_right</i>
            <router-link class="-item" to="/index/new-message">
               New message
            </router-link>
         </template>

      </nav>


      <!-- * Navigation view * -->
      <router-view class="index-page-router-view"/>

   </div>
</template>



<script>
import { mapGetters } from 'vuex'

export default {

   name: 'index-page',

   data(){
      return {
      };
   },

   computed: {
      ...mapGetters([
         'getSelectedConnection',
         'getSelectedQueue'
      ])
   },

   mounted(){
      if(!this.getSelectedConnection())
         this.$router.replace('/index/list-connections');
   },

   methods: {
      load(){

      }
   }

}
</script>



<style>
.index-page{
   display: flex;
   flex-direction: column;
   align-items: stretch;

   width: 100%;
   height: 100%;
}
.index-page > .-nav{
   display: flex;
   flex-direction: row;
   padding: 0.6em 1em;
}
.index-page > .-nav > *{
   vertical-align: middle;
}
.index-page > .-nav > .-item{
   text-transform: uppercase;
   letter-spacing: 0.05em;
}
.index-page > .-nav > .-arrow{
   font-size: 1.3em;
   opacity: 0.3;
   margin: 0 0.5em;
}
</style>
