<template>
   <ul class="v-queues-list">
      <router-link
         class="-item"
         tag="li"
         :to="'/index/connections/' + connectionname + '/queues/' + queue.name + '/messages/send'"
         v-for="queue in queues">
         <div class="-container">
            <span class="-name">{{ queue.name }}</span>
         </div>
      </router-link>
   </ul>
</template>



<script>
import { mapActions } from 'vuex'
import SavedConnection from '/app/connection/saved-connection'

export default {

   name: 'v-queues-list',

   props: {
      'queues': {
         type: Array,
         required: true
      },
      'connectionname': {
         type: String,
         required: true
      }
   }

}
</script>



<style>
.v-queues-list{
   border-radius: 6px;
   overflow: hidden;
   background-color: var(--m-grey-50);
   margin: 0 var(--h-padding) 1em var(--h-padding);
   box-shadow: 0 3px 8px -1px rgba(0, 0, 0, 0.1);
}

/**
 * Items
 */
.v-queues-list > .-item{
   padding: 0.8em 1em;
   transition: background-color 0.2s ease;
} .v-queues-list > .-item:hover{
   cursor: pointer;
   background-color: var(--m-grey-100);
}
/**
 * Item separator
 */
.v-queues-list > .-item::before{
   content: '';
   position: absolute;
   width: 100%;
   height: 1px;
   bottom: 0;
   left: 0;
   background-color: var(--m-grey-200);
   transition: opacity 0.2s ease;
}

/**
 * Queue name
 */
.v-queues-list > .-item > .-container > .-name{
   font-size: 1em;
   text-transform: uppercase;
   letter-spacing: 0.02em;
}
</style>
