<template>
   <div class="v-connections-view">

      <template v-if="!saved_connections">
         <!-- * View main title * -->
         <h1 class="-view-section-title fx--blurred-title">Connections</h1>

         <!-- * Connections listing * -->
         <v-connections-list :connections="saved_connections"/>

         <!-- * FABs list * -->
         <ul class="fab-list">
            <!-- * New connection form FAB * -->
            <router-link class="fab --raised" tag="button" :to="{ name: 'new-connection' }">
               <i class="material-icons">add</i>
            </router-link>
         </ul>
      </template>

      <!-- * No connections state * -->
      <template v-else>
         <div class="-no-connections-state">
            <!-- * No connections image * -->
            <img class="-no-connections-image" title="No saved connections were found">

            <!-- * No connections text * -->
            <h1 class="-no-connections-text fx--blurred-title">No connections in sight</h1>

            <router-link class="-add-first-connection" tag="button" :to="{ name: 'new-connection' }">
               <i class="material-icons">add_circle</i>
               &nbsp;&nbsp;
               <span class="-text">Create the first one</span>
            </router-link>
         </div>
      </template>

   </div>
</template>



<script>
import { mapState } from 'vuex'
import ConnectionsList from './v-connections-list'

export default {

   name: 'v-connections-view',

   components: {
      'v-connections-list': ConnectionsList
   },

   computed: {
      ...mapState('connection', [ 'saved_connections' ])
   }

}
</script>



<style>
.v-connections-view > .v-connections-list{
   padding-top: 1rem;
   padding-bottom: 4rem;
}

.v-connections-view{
   height: 100%;
}

.v-connections-view > .-no-connections-state{
   display: flex;
   flex-direction: column;
   align-items: center;

   height: 100%;

   padding: 1em 6em;

   overflow: auto;
}

.v-connections-view > .-no-connections-state > *{
   flex-shrink: 0;
}

.v-connections-view > .-no-connections-state > .-no-connections-image{
   width: 7em;
   height: 4em;

   margin-bottom: 1em;

   background-color: #FF00FF;

   overflow: hidden;

   object-fit: contain;
}

.v-connections-view > .-no-connections-state > .-no-connections-text{
   margin-bottom: 1em;
   text-align: center;
}

.v-connections-view > .-no-connections-state > .-add-first-connection{
   --btn-height: 3.2em;

   display: flex;
   align-items: center;

   height: var(--btn-height);
   padding: 0 1em;

   font-size: 1.05em;

   color: var(--m-grey-50);
   background-color: #00E676;

   border-radius: calc(var(--btn-height) / 2);

   box-shadow: 0 0 3px 1px rgba(0, 230, 118, 0.5);
}

.v-connections-view > .-no-connections-state > .-add-first-connection > .material-icons{
   font-size: 1.65em;
}
</style>
