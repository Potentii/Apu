<template>
   <div class="index-page">

      <!-- * Navigation breadcrumb * -->
      <nav class="-nav">

         <!-- * Connection selection link * -->
         <router-link class="-item" to="/index/connections">
            {{ getSelectedConnection() ? getSelectedConnection().name : 'Connections' }}
         </router-link>

         <!-- * Queue selection link * -->
         <template v-if="getSelectedConnection() && getSelectedQueue()">
            <i class="-arrow material-icons">keyboard_arrow_right</i>
            <router-link class="-item" :to="'/index/connections/' + getSelectedConnection().name">
               {{ getSelectedQueue().name }}
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

   computed: {
      ...mapGetters([
         'getSelectedConnection',
         'getSelectedQueue'
      ])
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
   flex-shrink: 0;

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


.index-page-router-view{
   overflow: auto;
}
</style>
