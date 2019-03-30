<template>
   <div class="v-fab-group">
      <div class="-main-fab-buttons-container">
         <slot name="main">

         </slot>
      </div>
      <div class="-sub-fab-buttons-container" v-if="!!enable_subs" :class="{ '--always-visible': always_show_subs }">
         <slot name="sub">

         </slot>
      </div>
   </div>
</template>



<script>
export default {
   name: 'v-fab-group',


   props: {
		'enable_subs': {
			type: Boolean,
			required: false,
			default: false
		},
   	'always_show_subs': {
         type: Boolean,
         required: false,
         default: false
      }
   }
}
</script>



<style>
.v-fab-group{
   --var-main-fab-size: 3.8rem;
   --var-sub-fab-size: 2.7rem;

   --v-fab-button-color: var(--m-green-a400);
   --v-fab-button-text-color: var(--m-grey-100);

   opacity: 0;
   visibility: hidden;
   position: fixed;
   display: flex;
   flex-direction: column-reverse;
   align-items: center;

   bottom: 1.5rem;
   right: 1.5rem;

   width: max-content;
   height: max-content;

   animation-name: v-fab-group-appear;
   animation-duration: 0.3s;
   animation-delay: 0.2s;
   animation-timing-function: ease;
   animation-fill-mode: both;

   overflow: visible;

   z-index: 8;
}

.v-fab-group > .-main-fab-buttons-container{
   --v-fab-button-size: var(--var-main-fab-size);
   --v-fab-button-text-size: 1rem;
   --v-fab-button-icon-size: 1.5rem;
}
.v-fab-group > .-sub-fab-buttons-container{
   --v-fab-button-size: var(--var-sub-fab-size);
   --v-fab-button-text-size: 1rem;
   --v-fab-button-icon-size: 1.2rem;

   --var-half-main-size: calc(var(--var-main-fab-size) / 2);
   --var-padding: calc(calc(var(--var-main-fab-size) - var(--var-sub-fab-size)) / 2);
   --var-spacing: calc(var(--var-padding) * 1.7);

   position: absolute;
   bottom: var(--var-half-main-size);
   left: 0;
   padding: var(--var-padding) var(--var-padding) calc(var(--var-half-main-size) + var(--var-spacing)) var(--var-padding);

   background-image: linear-gradient(to bottom, rgba(250, 250, 250, 0.8), rgba(250, 250, 250, 0));

   box-shadow: 0 -5px 16px -4px rgba(0,0,0,0.1);

   border-top-right-radius: var(--var-main-fab-size);
   border-top-left-radius: var(--var-main-fab-size);

   z-index: -1;
   overflow: hidden;
}
.v-fab-group > .-sub-fab-buttons-container > .v-fab-button + .v-fab-button{
   margin-top: calc(var(--var-padding) * 1.5);
}

.v-fab-group > .-sub-fab-buttons-container{
   transform: translateY(calc(var(--var-main-fab-size) * 1.5));
   opacity: 0;
   visibility: hidden;

   animation-name: v-fab-group-sub-fade-out;
   animation-duration: 0.3s;
   animation-delay: 0.1s;
   animation-timing-function: ease;
   animation-fill-mode: both;

   will-change: transform, opacity, visibility;
}
.v-fab-group > .-sub-fab-buttons-container.--always-visible,
.v-fab-group > .-sub-fab-buttons-container:hover,
.v-fab-group > .-main-fab-buttons-container:hover + .-sub-fab-buttons-container{
   animation-name: v-fab-group-sub-fade-in;
   animation-duration: 0.2s;
   animation-delay: 0.15s;
   animation-timing-function: ease;
   animation-fill-mode: both;
}

@keyframes v-fab-group-appear{
   100%{
      opacity: 1;
      visibility: visible;
   }
}

@keyframes v-fab-group-sub-fade-in {
   100%{
      visibility: visible;
      transform: translateY(0);
      opacity: 1;
   }
}
@keyframes v-fab-group-sub-fade-out {
   0%{
      visibility: visible;
      transform: translateY(0);
      opacity: 1;
   }
}

</style>
