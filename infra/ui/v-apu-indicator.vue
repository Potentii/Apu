<template>
   <span class="v-apu-indicator" :class="{ '--hidden': hidden, '--with-text': !!text }">
      <span class="-text" v-if="text">{{ text }}</span>
   </span>
</template>



<script>
export default {
   name: 'v-apu-indicator',


   props: {
      'text': {
         type: String,
         required: false,
         default: null
      },
		'hidden': {
			type: Boolean,
			required: false,
			default: false
		}
   }
}
</script>



<style>
.v-apu-indicator{
   --var-indicator-background: var(--v-apu-indicator-background, var(--m-grey-500));
   --var-indicator-color: var(--v-apu-indicator-color, var(--m-grey-50));
   --var-indicator-size: 0.55em;

   /*opacity: 0;*/
   display: inline-block;
   /*position: absolute;*/
   width: var(--var-indicator-size);
   height: var(--var-indicator-size);
   background-color: var(--var-indicator-background);

   /*right: -0.9em;*/
   /*top: -0.1em;*/
   border-radius: var(--var-indicator-size);

   box-shadow: 0 0 15px -2px var(--var-indicator-background);

   transition: opacity, background-color, box-shadow, 0.2s ease;
}
.v-apu-indicator.--with-text{
   display: flex;
   justify-content: center;
   align-items: center;
   width: max-content;
   height: max-content;

   border-radius: 3em;
}
.v-apu-indicator.--hidden{
   opacity: 0;
}

.v-apu-indicator > .-text{
   display: inline-block;
   padding: 0 0.8em;

   font-size: 0.59em;
   font-family: 'Roboto Regular', sans-serif;
   letter-spacing: 0.1em;

   color: var(--var-indicator-color);
}

</style>
