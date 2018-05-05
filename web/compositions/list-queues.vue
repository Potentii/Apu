<template>
   <div class="list-queues">
      <div class="-on-loading" v-if="loading">
         Loading...
      </div>
      <div class="-on-empty" v-if="!loading && !queues.length">
         No queues found
      </div>
      <ul class="-list" v-if="!loading && queues.length">
         <router-link
            class="-item"
            tag="li"
            :to="'/index/connections/' + conn.name + '/queues/' + queue.name"
            v-for="queue in queues">
            <span class="-name">{{ queue.name }}</span>
         </router-link>
      </ul>
   </div>
</template>



<script>
import Connection from '../types/connection'
import Queue from '../types/queue'

export default {

   name: 'list-queues',

   props: {
      'conn': {
         type: Connection,
         required: true
      }
   },

   data(){
      return {
         loading: false,
         queues: []
      };
   },

   beforeMount(){
      this.load();
   },

   methods: {
      loadQueues(){
         this.queues = [
            new Queue('queue-1'),
            new Queue('queue-2'),
            new Queue('queue-3'),
            new Queue('queue-4'),
            new Queue('queue-5')
         ];
      },

      load(){
         this.loading = true;

         try{
            this.loadQueues();
         } catch(err){
            console.error(err);
         }

         this.loading = false;
      }
   }

}
</script>



<style>
.list-queues > * {
   padding-left: 1rem;
   padding-right: 1rem;
}
.list-queues > .-title{
   font-size: 1.4em;
   font-weight: normal;
}
.list-queues > .-title > .-conn-name{
   font-weight: bold;
   font-family: 'Roboto Medium';
}

.list-queues > .-list > .-item{
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: 1fr 1fr;
   grid-template-areas:
      'location'
      'name';

   padding: 0.5em 1em;
}
.list-queues > .-list > .-item::after{
   content: '';
   postion: absolute;
   width: 100%;
   height: 1px;
   bottom: 0;
   left: 0;
   background-color: rgba(0,0,0,0.1);
}
.list-queues > .-list > .-item > .-location{
   grid-area: location;
}
.list-queues > .-list > .-item > .-name{
   grid-area: name;
}


.list-queues > .-list > .-item > .-name{
   font-size: 1.2em;
   font-weight: bold;
}
</style>
