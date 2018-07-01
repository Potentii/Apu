<template>
   <div class="v-queues-view">
      <template v-if="true">
         <!-- <router-link
            class="-item"
            tag="button"
            :to="'/index/connections/' + getSelectedConnection().name + '/edit'">
            Edit
         </router-link> -->

         <h1 class="-view-section-title">Queues</h1>

         <v-queues-list :connection="selected_saved_connection"/>
      </template>
      <template v-else>
         Loading connection info...
      </template>
   </div>
</template>



<script>
import { mapState } from 'vuex'
import QueuesList from './v-queues-list'
import ConnectionResolverMixin from '/app/connection/v-connection-resolver-mixin'

export default {

   name: 'v-queues-view',

   mixins: [
      ConnectionResolverMixin
   ],

   components: {
      'v-queues-list': QueuesList
   },

   computed: {
      ...mapState('connection', [ 'selected_saved_connection' ])
   }

}
</script>



<style>
.v-queues-view > .v-queues-list{
   padding-top: 1rem;
   padding-bottom: 4rem;
}
</style>
