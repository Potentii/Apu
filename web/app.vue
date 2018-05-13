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

   background-color: var(--blank-bg--base);
   background-image: url('./resources/images/noise.png');
   background-blend-mode: hard-light;

   --fab-background-color: var(--accent-bg--base);
   --fab-foreground-color: var(--accent-fg--base);
}
</style>
