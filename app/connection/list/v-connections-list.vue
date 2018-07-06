<template>
   <ul class="v-connections-list">
      <router-link
         class="-item"
         tag="li"
         :to="'/index/connections/' + saved_connection.name + '/queues'"
         v-for="saved_connection in connections">
         <div class="-container">
            <span class="-location">
               <span class="-manager">{{ saved_connection.data.queue_manager }}</span>
               <!-- <span class="-on"> on </span> -->
               <span class="-url">{{ saved_connection.data.host }}:{{ saved_connection.data.port }}</span>
            </span>
            <span class="-name">{{ saved_connection.name }}</span>
         </div>
      </router-link>
   </ul>
</template>



<script>
export default {

   name: 'v-connections-list',

   props: {
      /**
       * The saved connections to be displayed
       * @type {SavedConnection[]}
       */
      'connections': {
         type: Array,
         required: true
      }
   }

}
</script>



<style>
.v-connections-list > .-item{
   margin: 0 var(--h-padding) 1em var(--h-padding);
   padding: 0.9em 1.4em;
   overflow: hidden;
   border-radius: 8px;
   background-color: var(--m-grey-50);
   box-shadow: 0 3px 10px -1px rgba(0, 0, 0, 0.08);

   transition: background-color, box-shadow, 0.2s ease;
} .v-connections-list > .-item:hover{
   cursor: pointer;
   background-color: var(--m-grey-100);
   box-shadow: 0 3px 3px -1px rgba(0, 0, 0, 0.1);
}
.v-connections-list > .-item::before{
   content: '';
   position: absolute;
   opacity: 0.5;
   width: 6px;
   height: 100%;
   top: 0;
   left: 0;
   background-color: var(--m-grey-800);
   transition: opacity 0.2s ease;
} .v-connections-list > .-item:hover::before{
   opacity: 1;
}


.v-connections-list > .-item > .-container{
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: auto;
   grid-row-gap: 0.3em;
   grid-template-areas:
      'location'
      'name';
}

.v-connections-list > .-item > .-container > .-location{
   grid-area: location;
}
.v-connections-list > .-item > .-container > .-name{
   grid-area: name;
}

.v-connections-list > .-item > .-container > .-location{
   font-size: 0.7em;
   color: var(--m-grey-500);
   letter-spacing: 0.03em;
}
.v-connections-list > .-item > .-container > .-location > .-manager{
   font-weight: bold;
   margin-right: 0.3em;
   text-transform: uppercase;
}

.v-connections-list > .-item > .-container > .-name{
   font-size: 1.4em;
   font-family: 'Roboto Medium';
}
</style>
