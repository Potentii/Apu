<template>
</template>


<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import UIMessage from '/app/ui-messages/ui-message'
import Queue from './saved-queue'

export default {

   name: 'v-queue-resolver-mixin',

   computed: {
      ...mapState('queue', [ 'selected_queue' ])
   },

   beforeMount(){
      const queue_name = this.$route.params.queue_name;

      if(!queue_name){
         this.clearSelectedQueue();
         this.addMessage(new UIMessage('ERROR', `Error while loading the queue`));
         this.$router.go(-1);
      } else{
         const queue = new Queue(queue_name);
         this.setSelectedQueue(queue);
      }
   },

   beforeRouteLeave(to, from, next){
      if(this.selected_queue)
         this.clearSelectedQueue();

      next();
   },

   methods: {
      ...mapMutations('queue', [ 'setSelectedQueue', 'clearSelectedQueue' ]),
      ...mapActions('ui-messages', [ 'addMessage' ])
   }

}
</script>
