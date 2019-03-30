<template>
<!--   <button class="v-fab-button &#45;&#45;raised" :class="{ '&#45;&#45;sub': !!sub }">-->
<!--      <slot></slot>-->
<!--   </button>-->
   <md-button class="v-fab-button md-fab" :class="{ '--sub': !!sub, '--raised': !flat }" @click="$emit('click', $event)">
      <slot></slot>
   </md-button>
</template>



<script>
export default {
   name: 'v-fab-button',


   props: {
      'sub': {
         type: Boolean,
         required: false,
         default: false
      },
      'flat': {
			type: Boolean,
			required: false,
			default: false
      }
   }
}
</script>



<style>
.v-fab-button{
   --var-fab-size: var(--v-fab-button-size, 4em);
   --var-fab-text-size: var(--v-fab-button-text-size, 1em);
   --var-fab-icon-size: var(--v-fab-button-icon-size, 1em);

   --var-fab-color: var(--v-fab-button-color, #EEEEEE);
   --var-fab-text-color: var(--v-fab-button-text-color, #212121);
   --var-fab-aura-color--hover: var(--v-fab-button-aura-color--hover, var(--var-fab-text-color));
   /*--var-fab-icon-color: var(--v-fab-button-icon-color, #212121);*/
   /*--var-fab-icon-color--hover: var(--v-fab-button-icon-color--hover, var(--var-fab-icon-color));*/

   cursor: pointer;
   display: flex;
   justify-content: center;
   align-items: center;

   width: var(--var-fab-size);
   height: var(--var-fab-size);

   background-color: var(--fab-background-color);
   color: var(--fab-foreground-color);
   border-radius: 50%;

   animation-name: fab-fade-in;
   animation-duration: 0.2s;
   animation-delay: 0.2s;
   animation-timing-function: ease-out;

   will-change: opacity, transform;

   user-select: none;
}
.v-fab-button.md-fab{
   --md-theme-default-accent: var(--var-fab-color);
   --md-theme-default-disabled-background-on-background: var(--var-fab-color);
   --md-theme-default-text-primary-on-background: var(--var-fab-text-color);
   --md-theme-default-disabled-on-background: var(--var-fab-text-color);

   margin: 0;
   width: var(--var-fab-size);
   height: var(--var-fab-size);

   box-shadow: none;
   transition: box-shadow 0.2s ease;
}
.v-fab-button.md-fab:hover{
   --md-theme-default-text-primary-on-background: var(--var-fab-aura-color--hover);
   --md-theme-default-disabled-on-background: var(--var-fab-aura-color--hover);
}
.v-fab-button.md-fab:disabled{
   opacity: 0.8;
   filter: grayscale(0.4);
}



.v-fab-button.md-fab .md-button-content{
   display: flex;
   justify-content: center;
   align-items: center;
}


.v-fab-button > *,
.v-fab-button.md-fab .md-button-content > *{
   /*--md-theme-default-text-primary-on-background: var(--var-fab-text-color);*/
   font-size: var(--var-fab-text-size);
}
.v-fab-button > .material-icons,
.v-fab-button.md-fab .md-button-content > .material-icons{
   font-size: var(--var-fab-icon-size);
}


.v-fab-button > .material-icons,
.v-fab-button.md-fab .md-button-content > .material-icons{
   font-size: var(--var-fab-icon-size);
}


.v-fab-button:enabled.--raised{
   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.10);
} .v-fab-button.--raised:enabled:hover{
   box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.20);
} .v-fab-button.--raised:enabled:active{
   box-shadow: 0 6px 4px -3px rgba(0, 0, 0, 0.2);
}

.v-fab-button:disabled.--raised{
   box-shadow: 0 0 4px -1px rgba(0, 0, 0, 0.15);
}

@keyframes fab-fade-in {
   0%{
      opacity: 0;
      transform: scale(0.75);
   }
}
</style>
