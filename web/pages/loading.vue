<template>
   <div class="loading-page">
      <span class="-message">{{ message }}</span>
   </div>
</template>


<script>
import { mapMutations } from 'vuex'
import Connection from '../types/connection'

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

      loadSavedConnections(){
         this.clearSavedConnections();
         [
            new Connection('conn1', '127.1.1.0', 1234, 'ABC', 'chann-123'),
            new Connection('conn2', '127.1.1.0', 1234, 'ABC', ''),
            new Connection('conn3', '127.1.1.0', 1234, 'ABC', ''),
            new Connection('conn4', '127.1.1.0', 1234, 'ABC', 'chann-456')
         ].forEach(c => this.addSavedConnection(c));
      },

      loadPreferences(){

      },

      load(){
         this.message = 'Loading preferences';
         this.loadPreferences();
         this.message = 'Loading saved connections';
         this.loadSavedConnections();

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
