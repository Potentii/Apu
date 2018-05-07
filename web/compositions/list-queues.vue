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
            <div class="-container">
               <span class="-name">{{ queue.name }}</span>
            </div>
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
.list-queues > .-list{
   border-radius: 3px;
   overflow: hidden;
   background-color: var(--m-grey-50);
   margin: 0 var(--h-padding) 1em var(--h-padding);
}

.list-queues > .-list > .-item{
   padding: 0.8em 1em;
   transition: background-color 0.2s ease;
} .list-queues > .-list > .-item:hover{
   cursor: pointer;
   background-color: var(--m-grey-100);
}
.list-queues > .-list > .-item::before{
   content: '';
   position: absolute;
   width: 100%;
   height: 1px;
   bottom: 0;
   left: 0;
   background-color: var(--m-grey-200);
   transition: opacity 0.2s ease;
}

.list-queues > .-list > .-item > .-container > .-name{
   font-size: 1em;
   text-transform: uppercase;
   letter-spacing: 0.02em;
}
</style>
