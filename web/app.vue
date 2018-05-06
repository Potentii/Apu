<template>
   <div id="app" @message="onMessage($event)">
      <router-view/>
   </div>
</template>

<script>
export default {
   name: 'app',

   methods: {
      onMessage(e){
         console.log('message: ' + e);
      }
   }
}
</script>

<style>
#app{
   width: 100%;
   height: 100%;
}
</style>
