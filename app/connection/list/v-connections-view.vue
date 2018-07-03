<template>
   <div class="v-connections-view">

      <template v-if="saved_connections && saved_connections.length">
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
            <!-- <img class="-no-connections-image" title="No saved connections were found"> -->

            <!-- * No connections text * -->
            <h1 class="-no-connections-text fx--blurred-title text--ui-label">No connections in sight</h1>

            <router-link class="-add-first-connection text--ui-label" tag="button" :to="{ name: 'new-connection' }">
               <i class="-icon material-icons">add_circle</i>
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
.v-connections-view{
   height: 100%;
}

.v-connections-view > .v-connections-list{
   padding-top: 1rem;
   padding-bottom: 4rem;
}

.v-connections-view > .-no-connections-state{
   display: flex;
   flex-direction: column;
   align-items: center;

   height: 100%;

   padding: 4em 6em 1em 6em;

   overflow: auto;
}

.v-connections-view > .-no-connections-state > *{
   flex-shrink: 0;
}

.v-connections-view > .-no-connections-state > .-no-connections-image{
   width: 12em;
   height: 6em;

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
   --btn-height: 2.9em;

   display: flex;
   align-items: center;

   height: var(--btn-height);
   padding: 0 1em;

   font-size: 1.05em;

   color: var(--m-grey-50);
   background-color: #00E676;

   border-radius: calc(var(--btn-height) / 2);

   animation: add-first-connection-pulse 2s ease infinite;
   transition: box-shadow, transform, 0.2s ease;
} .v-connections-view > .-no-connections-state > .-add-first-connection:hover{
   animation: none;
   transform: scale(1.03);
   box-shadow: 0 3px 10px 2px rgba(0, 230, 118, 0.2);
}

@keyframes add-first-connection-pulse {
   0%{
      box-shadow: 0 0 0 0 rgba(0, 230, 118, 0.8);
   }
   70%{
      box-shadow: 0 0 4px 10px rgba(0, 230, 118, 0);
   }
   100%{
      box-shadow: 0 0 0 0 rgba(0, 230, 118, 0);
   }
}

.v-connections-view > .-no-connections-state > .-add-first-connection > .-icon{
   margin-right: 0.3em;
   font-size: 1.65em;
   text-shadow: 0 2px 7px rgba(0, 0, 0, 0.12);
}
.v-connections-view > .-no-connections-state > .-add-first-connection > .-text{
   font-weight: 600;
}

</style>
