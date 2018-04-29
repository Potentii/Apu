<template>
   <div class="loading-page">

   </div>
</template>


<script>
export default {

   name: 'loading-page',

   data(){
      return {
         curr_loading_message: ''
      };
   },

   methods: {

      async loadPreferences(){

      },

      async load(){
         this.curr_loading_message = 'Loading preferences';
         await loadPreferences();
      }

   }

}
</script>


<style>
.loading-page{
   display: grid;
   width: 100%;
   height: 100%;

}
</style>
