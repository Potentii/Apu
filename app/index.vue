<template>
   <div class="index-page">

      <!-- * Navigation breadcrumb * -->
      <nav class="-nav text--ui-label">

         <!-- * Home link * -->
         <router-link class="-item -logo" to="/index/connections" :title="!!selected_saved_connection ? 'Back to connections' : ''">
            <!-- TODO add icon -->
            <span class="-text fx--blurred-title">Apu</span>
         </router-link>

         <!-- * Connection link * -->
         <template v-if="selected_saved_connection">
            <i class="-arrow material-icons -fade-in">navigate_next</i>
            <router-link class="-item -fade-in" :to="'/index/connections/' + selected_saved_connection.name + '/queues'" :title="!!selected_queue ? 'Back to queues' : ''" :disabled="true">
               <span class="-label">{{ selected_saved_connection.name }}</span>
               <span class="-selection"></span>
            </router-link>
         </template>

         <!-- * Queue link * -->
         <template v-if="selected_saved_connection && selected_queue">
            <i class="-arrow material-icons -fade-in">navigate_next</i>
            <router-link class="-item -fade-in" :to="'/index/connections/' + selected_saved_connection.name + '/queues/' + selected_queue.name + '/messages/send'">
               <span class="-label">{{ selected_queue.name }}</span>
               <span class="-selection"></span>
            </router-link>
         </template>

      </nav>

      <!-- * Navigation view * -->
      <router-view class="-router"></router-view>

   </div>
</template>



<script>
import { mapState } from 'vuex'



export default {

   name: 'index-page',

   computed: {
      ...mapState('connection', [
         'selected_saved_connection'
      ]),

      ...mapState('queue', [
         'selected_queue'
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

   --h-padding: 1rem;
}


/**
 * Breadcrumb
 */
.index-page > .-nav{
   flex-shrink: 0;
   display: flex;
   flex-direction: row;
   align-items: stretch;

   padding: 0 var(--h-padding);

   background-image: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));

   overflow: visible;
   z-index: 6;
}

.index-page > .-nav > .-item{
   display: flex;
   align-items: stretch;
   overflow: visible;
}
.index-page > .-nav > .-arrow {
   display: flex;
   align-items: center;
}

/**
 * Breadcrumb items
 */
.index-page > .-nav > .-item{
   padding: 0.6rem 1rem;
   letter-spacing: 0.05em;
   color: var(--m-grey-900);
} .index-page > .-nav > .-item.-logo{
   font-size: 1.3em;
   font-family: 'Roboto Medium', sans-serif;
   color: var(--m-grey-900);
} .index-page > .-nav > .-item:not(.-logo){
   text-transform: uppercase;
} .index-page > .-nav > .-item:hover:not(:last-of-type){
   cursor: pointer;
} .index-page > .-nav > .-item:hover{
   text-decoration: none;
   color: var(--m-grey-900);
} .index-page > .-nav > .-item:first-of-type{
   padding-left: 0;
}

.index-page > .-nav > .-item > .-label{
   display: inline-block;
   z-index: 1;
}
.index-page > .-nav > .-item > .-selection{
   opacity: 0;
   display: block;
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   background: linear-gradient(
      to left,
      rgba(0, 230, 118, 0.8),
      rgba(29, 233, 182, 0)
   );
   background-blend-mode: hard-light;

   transform: translateX(3em);

   border-top-right-radius: 2em;
   border-bottom-right-radius: 2em;

   box-shadow: 9px 0 15px -6px rgba(0, 230, 118, 0.5);

   overflow: visible;

   transition: opacity, transform, 0.12s ease;
} .index-page > .-nav > .-item:last-of-type > .-selection{
   opacity: 1;
   transform: translateX(0);
}

.index-page > .-nav > .-item:last-of-type > .-label{
   font-family: 'Roboto Medium', sans-serif;
}
.index-page > .-nav > .-item:hover > .-label{
   font-family: 'Roboto Medium', sans-serif;
}


.index-page > .-nav > .-fade-in{
   animation-name: index-page-nav-fade-in;
   animation-duration: 0.15s;
   animation-timing-function: ease-in-out;
}

@keyframes index-page-nav-fade-in {
   0% {
      opacity: 0;
      transform: translateX(-50%);
   }
   100% {
      opacity: 1;
      transform: translateX(0);
   }
}


/**
 * Breadcrumb separators
 */
.index-page > .-nav > .-arrow{
   font-size: 1.3em;
   margin: 0 0;
   color: var(--m-grey-400);
}


.index-page > .-router{

   /*overflow: hidden;*/
   /*flex-grow: 0;*/
   /*flex-shrink: 1;*/
   /*height: max-content;*/
}

/*.index-page > .-router > .-view-section-title{*/
   /*cursor: default;*/
   /*user-select: none;*/
   /*font-family: 'Roboto Medium', sans-serif;*/
   /*letter-spacing: 0.06em;*/
   /*font-size: 1.5em;*/
   /*padding: 0.1em var(--h-padding);*/
/*}*/
</style>
