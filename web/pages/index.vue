<template>
   <div class="index-page">

      <!-- * Navigation breadcrumb * -->
      <nav class="-nav">

         <!-- * Home link * -->
         <router-link class="-item -logo" to="/index/connections">
            <!-- TODO add icon -->
            <span class="-text">Apu</span>
         </router-link>

         <!-- * Connection link * -->
         <template v-if="getSelectedConnection()">
            <i class="-arrow material-icons -fade-in">navigate_next</i>
            <router-link class="-item -fade-in" :to="'/index/connections/' + getSelectedConnection().name">
               {{ getSelectedConnection().name }}
            </router-link>
         </template>

         <!-- * Queue link * -->
         <template v-if="getSelectedConnection() && getSelectedQueue()">
            <i class="-arrow material-icons -fade-in">navigate_next</i>
            <router-link class="-item -fade-in" :to="'/index/connections/' + getSelectedConnection().name + '/queues/' + getSelectedQueue().name">
               {{ getSelectedQueue().name }}
            </router-link>
         </template>

      </nav>

      <!-- * Navigation view * -->
      <router-view class="-router"/>

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
   /* padding: 0.6em calc(var(--h-padding) * 2 / 3); */
   padding: 0.6em var(--h-padding);
}

.index-page > .-nav > .-item,
.index-page > .-nav > .-arrow {
   display: flex;
   align-items: center;
}

/**
 * Breadcrumb items
 */
.index-page > .-nav > .-item{
   padding: 0.1rem 0;
   letter-spacing: 0.05em;
   color: var(--m-grey-900);
} .index-page > .-nav > .-item.-logo{
   font-size: 1.3em;
   font-family: 'Roboto Medium';
} .index-page > .-nav > .-item:not(.-logo){
   text-transform: uppercase;
} .index-page > .-nav > .-item:hover:not(:last-of-type){
   cursor: pointer;
}
.index-page > .-nav > .-item::after{
   content: '';
   opacity: 0;
   position: absolute;
   left: 0;
   bottom: -1px;
   width: 100%;
   height: 3px;
   background-color: #000;
   transform: translateY(-3px);
   transition: opacity, transform, 0.12s ease;
} .index-page > .-nav > .-item:hover::after,
  .index-page > .-nav > .-item:last-of-type::after{
   opacity: 1;
   transform: translateY(0);
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
   margin: 0 0.3rem;
   color: var(--m-grey-400);
}


.index-page > .-router{
   overflow: auto;
}

.index-page > .-router > .-view-section-title{
   font-family: 'Roboto Medium';
   letter-spacing: 0.03em;
   font-size: 1.5em;
   padding: 0.1em var(--h-padding);
}
</style>
