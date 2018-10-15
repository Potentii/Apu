<template>
   <div id="app">
      <router-view/>
      <ui-messages-dispatcher/>
   </div>
</template>


<script>
import UIMessagesDispatcher from './ui-messages/ui-messages-dispatcher'



export default {
   name: 'app',

   components: {
      'ui-messages-dispatcher': UIMessagesDispatcher
   }
}
</script>


<style>
#app{
   width: 100%;
   height: 100%;

   letter-spacing: 0.06em;
   font-family: 'Roboto', sans-serif;

   background-color: var(--blank-bg--base);
   background-image: url('../infra/style/resources/images/noise.png');
   background-blend-mode: hard-light;

   --fab-background-color: var(--accent-bg--base);
   --fab-foreground-color: var(--accent-fg--base);
}
</style>
