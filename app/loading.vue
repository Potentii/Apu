<template>
   <div class="loading-page">
      <span class="-message">{{ message }}</span>
   </div>
</template>


<script>
import { mapMutations, mapActions } from 'vuex'

export default {

   name: 'loading-page',

   data(){
      return {
         message: ''
      };
   },

   beforeMount(){
      this.load();
   },

   methods: {
      ...mapMutations([
         'clearSavedConnections',
         'addSavedConnection',
         'markAsLoaded'
      ]),

      ...mapActions('connection', [
         'refreshSavedConnectionsFromCache'
      ]),

      loadPreferences(){

      },

      load(){
         this.message = 'Loading preferences';
         this.loadPreferences();
         this.message = 'Loading saved connections';
         this.refreshSavedConnectionsFromCache();

         this.markAsLoaded();

         const redirect_to = this.$route.params.redirect_to;
         if(redirect_to)
            this.$router.replace({
               name: redirect_to.name,
               params: redirect_to.params,
               hash: redirect_to.hash,
               query: redirect_to.query
            });
         else
            this.$router.push({ name: 'connections' });
      }

   }

}
</script>


<style>
.loading-page{
   display: flex;
   justify-content: center;
   align-items: center;

   width: 100%;
   height: 100%;

}
</style>
