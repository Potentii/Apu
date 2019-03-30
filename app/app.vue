<template>
   <v-app class="app">
      <div class="app-content">
         <router-view></router-view>
         <v-dialogs></v-dialogs>
         <ui-messages-dispatcher class="-messages-dispatcher"></ui-messages-dispatcher>
      </div>
   </v-app>
</template>


<script>
import UIMessagesDispatcher from './ui-messages/ui-messages-dispatcher'
import VDialogs             from './v-dialogs'



export default {
   name: 'app',

   components: {
		VDialogs,
      'ui-messages-dispatcher': UIMessagesDispatcher
   }
}
</script>


<style>
/**
 * The app colors
 */
:root{

   /**
    * Material colors
    */
   --m-red-800: #C62828;
   --m-red-a400: #FF1744;

   --m-pink-a200: #FF4081;
   --m-pink-a400: #F50057;

   --m-purple-700: #7B1FA2;

   --m-blue-600: #1E88E5;
   --m-blue-700: #1976D2;

   --m-cyan-a200: #18FFFF;
   --m-cyan-a400: #00E5FF;
   --m-cyan-a700: #00B8D4;

   --m-yellow-700: #FBC02D;
   --m-yellow-a400: #FFEA00;

   --m-light-green-a400: #76FF03;

   --m-green-a400: #00E676;

   --m-grey-50: #FAFAFA;
   --m-grey-100: #F5F5F5;
   --m-grey-200: #EEEEEE;
   --m-grey-300: #E0E0E0;
   --m-grey-400: #BDBDBD;
   --m-grey-500: #9E9E9E;
   --m-grey-600: #757575;
   --m-grey-700: #616161;
   --m-grey-800: #424242;
   --m-grey-900: #212121;



   /**
    * Theme colors
    */
   /* Blank */
   --blank-bg--base: var(--m-grey-200);
   --blank-bg--1: var(--m-grey-50);
   --blank-bg--2: var(--m-grey-300);
   --blank-fg--base: var(--m-grey-900);
   --blank-ic--base: var(--m-grey-700);

   /* Primary */
   --primary-bg--base: var(--m-pink-a400);
   --primary-bg--1: var(--m-pink-a400);
   --primary-bg--2: var(--m-pink-a400);
   --primary-fg--base: var(--m-grey-50);
   --primary-ic--base: var(--m-grey-200);

   /* Accent */
   --accent-bg--base: var(--m-green-a400);
   --accent-bg--1: var(--m-green-a400);
   --accent-bg--2: var(--m-green-a400);
   --accent-fg--base: var(--m-grey-50);
   --accent-ic--base: var(--m-grey-700);

   /* Links */
   --link-fg: var(--m-blue-700);
   --link-fg--visited: var(--m-blue-700);

   /* Text selection */
   /*--selection-bg: var(--m-green-a400);*/
   /*--selection-fg: var(--m-grey-50);*/
}


/**
 * Setting the default app typography
 */
:root{
   font-family: 'Roboto', sans-serif;
   font-size: 16px;
   /* -webkit-font-smoothing: antialiased; */
}

:root .material-icons{
   font-display: swap;
}



/**
 * Setting the default color
 */
body{
   background-color: var(--blank-bg--base);
   color: var(--blank-fg--base);
}

::selection{
   background: var(--accent-bg--base) !important;
   color: var(--accent-fg--base) !important;
}


.app{
   width: 100%;
   height: 100%;
}
.app.application > .application--wrap > .app-content{
   width: 100%;
   height: 100%;

   letter-spacing: 0.06em;
   font-family: 'Roboto', sans-serif;

   background-color: var(--blank-bg--base);
   background-image: url('../resources/images/noise.png');
   background-blend-mode: hard-light;
   background-repeat: repeat;

   --fab-background-color: var(--accent-bg--base);
   --fab-foreground-color: var(--accent-fg--base);
}

.app .v-fab-button{
   --v-fab-button-color: var(--m-green-a400);
   --v-fab-button-text-color: var(--m-grey-100);
}
</style>
