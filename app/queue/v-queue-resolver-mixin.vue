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
         this.addMessage(new UIMessage(UIMessage.SEVERITY.ERROR, `Error while loading the queue`));
         this.$router.go(-1);
      } else{
         const queue = new Queue(queue_name);
         this.setSelectedQueue(queue);
      }
   },

   beforeRouteLeave(to, from, next){
      // *Clearing the selected queue only if the next page won't need it:
      if(!to.params.hasOwnProperty('queue_name') && this.selected_queue)
         this.clearSelectedQueue();

      // *Taking the user to the next page:
      next();
   },

   methods: {
      ...mapMutations('queue', [ 'setSelectedQueue', 'clearSelectedQueue' ]),
      ...mapActions('ui-messages', [ 'addMessage' ])
   }

}
</script>
