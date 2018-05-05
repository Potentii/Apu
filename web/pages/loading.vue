<template>
   <div class="loading-page">
      <span class="-message">{{ message }}</span>
   </div>
</template>


<script>
import { mapMutations } from 'vuex'

export default {

   name: 'loading-page',

   data(){
      return {
         message: ''
      };
   },

   mounted(){
      this.load();
   },

   methods: {
      ...mapMutations([
         'markAsLoaded'
      ]),

      async loadPreferences(){

      },

      async load(){
         this.message = 'Loading preferences';
         await this.loadPreferences();

         this.markAsLoaded();
         this.$router.push('index');
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
