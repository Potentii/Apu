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
                  <span class="-on"> on </span>
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
   --v-padding: 0.6em;
   padding: var(--v-padding) 1em;
}
.list-connections > .-list > .-item:hover{
   cursor: pointer;
   background-color: rgba(0, 0, 0, 0.03);
}
.list-connections > .-list > .-item >.-container::after{
   content: '';
   position: absolute;
   width: 100%;
   height: 1px;
   bottom: calc(var(--v-padding) * -1);
   left: 0;
   background-color: rgba(0,0,0,0.1);
}


.list-connections > .-list > .-item > .-container{
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: 1fr 1fr;
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


.list-connections > .-list > .-item > .-container > .-name{
   font-size: 1.2em;
   font-weight: bold;
}
</style>
