<template>
   <div class="list-connections">
      <ul class="-list">
         <router-link
            class="-item"
            tag="li"
            :to="'/index/connections/' + conn.name"
            v-for="conn in conns">
            <div class="-container">
               <span class="-location">
                  <span class="-manager">{{ conn.queue_manager }}</span>
                  <!-- <span class="-on"> on </span> -->
                  <span class="-url">{{ conn.host }}:{{ conn.port }}</span>
               </span>
               <span class="-name">{{ conn.name }}</span>
            </div>
         </router-link>
      </ul>
   </div>
</template>



<script>
export default {

   name: 'list-connections',

   props: {
      'conns': {
         type: Array,
         required: true
      }
   }

}
</script>



<style>
.list-connections > .-list > .-item{
   margin: 0 var(--h-padding) 1em var(--h-padding);
   padding: 0.6em 1em;
   overflow: hidden;
   border-radius: 3px;
   background-color: var(--m-grey-50);
   box-shadow: 0 3px 2px -1px rgba(0, 0, 0, 0.15);

   transition: background-color, box-shadow, 0.2s ease;
}
.list-connections > .-list > .-item:hover{
   cursor: pointer;
   background-color: var(--m-grey-100);
   box-shadow: 0 7px 4px -4px rgba(0, 0, 0, 0.15);
}
.list-connections > .-list > .-item::before{
   content: '';
   position: absolute;
   opacity: 0.5;
   width: 4px;
   height: 100%;
   top: 0;
   left: 0;
   background-color: var(--m-grey-800);
   transition: opacity 0.2s ease;
} .list-connections > .-list > .-item:hover::before{
   opacity: 1;
}


.list-connections > .-list > .-item > .-container{
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: auto;
   grid-template-areas:
      'location'
      'name';
}
.list-connections > .-list > .-item > .-container > .-location{
   grid-area: location;
}
.list-connections > .-list > .-item > .-container > .-name{
   grid-area: name;
}

.list-connections > .-list > .-item > .-container > .-location{
   font-size: 0.7em;
   color: var(--m-grey-500);
   letter-spacing: 0.03em;
}
.list-connections > .-list > .-item > .-container > .-location > .-manager{
   font-weight: bold;
   margin-right: 0.3em;
   text-transform: uppercase;
}

.list-connections > .-list > .-item > .-container > .-name{
   font-size: 1.4em;
   font-family: 'Roboto Medium';
}
</style>
