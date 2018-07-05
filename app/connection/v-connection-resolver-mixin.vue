<template>
</template>


<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import UIMessage from '/app/ui-messages/ui-message'

export default {

   name: 'v-connection-resolver-mixin',

   computed: {
      ...mapState('connection', [ 'selected_saved_connection' ]),
      ...mapGetters('connection', [ 'getSavedConnectionByName' ])
   },

   beforeMount(){
      const connection_name = this.$route.params.conn_name;
      const saved_connection = this.getSavedConnectionByName(connection_name);

      if(!saved_connection){
         this.clearSelectedSavedConnection();
         this.addMessage(new UIMessage(UIMessage.SEVERITY.ERROR, `Error while loading the connection`));
         this.$router.go(-1);
      } else{
         this.setSelectedSavedConnection(saved_connection);
      }
   },

   beforeRouteLeave(to, from, next){
      // *Clearing the selected connection only if the next page won't need it:
      if(!to.params.hasOwnProperty('conn_name') && this.selected_saved_connection)
         this.clearSelectedSavedConnection();

      // *Taking the user to the next page:
      next();
   },

   methods: {
      ...mapMutations('connection', [ 'setSelectedSavedConnection', 'clearSelectedSavedConnection' ]),
      ...mapActions('ui-messages', [ 'addMessage' ])
   }

}
</script>
