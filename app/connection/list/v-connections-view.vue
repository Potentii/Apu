<template>
   <div class="v-connections-view">

      <template v-if="saved_connections && saved_connections.length">

         <!-- * Section header * -->
         <v-apu-section-header class="-header" title_class="-header-title" content_class="-header-content" no_separator>

            <!-- * Title * -->
            <span class="-title" slot="title">
               <span class="-name">Connections</span>
            </span>

         </v-apu-section-header>


         <!-- * Content * -->
         <v-faded-viewport class="-main" content_class="-main-content">

            <!-- * Connections listing * -->
            <v-connections-list :connections="saved_connections"></v-connections-list>

         </v-faded-viewport>


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
import { mapState }      from 'vuex'
import ConnectionsList   from './v-connections-list'
import VApuSectionHeader from '../../../infra/ui/v-apu-section-header';
import VFadedViewport    from '../../../infra/ui/v-faded-viewport';

export default {

   name: 'v-connections-view',

   components: {
		VFadedViewport,
		VApuSectionHeader,
      'v-connections-list': ConnectionsList
   },

   computed: {
      ...mapState('connection', [ 'saved_connections' ])
   }

}
</script>



<style>
.v-connections-view{
   display: flex;
   flex-direction: column;
   height: 100%;
}


/**
 * Header
 */
.v-connections-view > .-header{
   /*margin-bottom: 1rem;*/
   position: absolute;
   z-index: 4;
}

.v-connections-view > .-header .-header-title > .-title{
   cursor: default;
}
.v-connections-view > .-header .-header-title > .-title > .-name{
   font-size: 1.2em;
}


.v-connections-view > .-main{
   flex-grow: 1;
   height: 100%;
}
.v-connections-view > .-main .-main-content{
   display: flex;
   flex-direction: column;

   padding-top: 4.5rem;
   padding-bottom: 5rem;

   overflow: auto;
}

.v-connections-view > .-main .-main-content > .v-connections-list{
   /*padding-top: 1rem;*/
   /*padding-bottom: 4rem;*/
}


.v-connections-view > .fab-list{
   z-index: 8;
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
   background-color: var(--accent-bg--base);

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
