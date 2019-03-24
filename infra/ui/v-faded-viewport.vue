<template>
   <div class="v-faded-viewport">
      <div class="-fade -top-fade" v-if="!no_top_fade && !fadeless"></div>
      <div class="-content" :class="content_classes">
         <slot></slot>
      </div>
      <div class="-fade -bottom-fade" v-if="!no_bottom_fade && !fadeless"></div>
   </div>
</template>



<script>
export default {
   name: 'v-faded-viewport',


   props: {
      'no_top_fade': {
         type: Boolean,
         required: false,
         default: false
      },
		'no_bottom_fade': {
			type: Boolean,
			required: false,
			default: false
		},
		'fadeless': {
			type: Boolean,
			required: false,
			default: false
		},
      'content_class': {
         type: String,
         required: false,
         default: null
      }
   },


	computed: {
		content_classes(){
			const classes = {};
			if(this.content_class)
				classes[this.content_class] = true;
			return classes;
		}
	}
}
</script>



<style>
.v-faded-viewport{
   display: flex;
   flex-direction: column;
   align-items: stretch;
}

.v-faded-viewport > .-fade{
   position: absolute;
   width: 100%;
   height: 3rem;
   background-color: var(--blank-bg--base);
   background-image: url('/infra/style/resources/images/noise.png');
   background-blend-mode: hard-light;
   background-repeat: repeat;

   z-index: 2;
}
.v-faded-viewport > .-top-fade{
   top: 0;
   left: 0;

   -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0,0,0,1) 10%,
      rgba(0,0,0,0)
   );
}
.v-faded-viewport > .-bottom-fade{
   bottom: 0;
   left: 0;

   -webkit-mask-image: linear-gradient(
      to top,
      rgba(0,0,0,1) 10%,
      rgba(0,0,0,0)
   );
}
</style>
