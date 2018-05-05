<template>
   <div class="list-connections">
      <ul class="-list">
         <router-link
            class="-item"
            tag="li"
            :to="'/index/connections/' + conn.name"
            v-for="conn in conns">
            <span class="-location">
               <span class="-manager">{{ conn.queue_manager }}</span>
               <span class="-on"> on </span>
               <span class="-url">{{ conn.host }}:{{ conn.port }}</span>
            </span>
            <span class="-name">{{ conn.name }}</span>
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
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: 1fr 1fr;
   grid-template-areas:
      'location'
      'name';

   padding: 0.5em 1em;
}
.list-connections > .-list > .-item::after{
   content: '';
   postion: absolute;
   width: 100%;
   height: 1px;
   bottom: 0;
   left: 0;
   background-color: rgba(0,0,0,0.1);
}
.list-connections > .-list > .-item > .-location{
   grid-area: location;
}
.list-connections > .-list > .-item > .-name{
   grid-area: name;
}


.list-connections > .-list > .-item > .-name{
   font-size: 1.2em;
   font-weight: bold;
}
</style>
