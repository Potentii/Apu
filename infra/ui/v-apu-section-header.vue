<template>
   <header class="v-apu-section-header">
      <div class="-bar">
         <div class="-title" :class="title_classes">
            <slot name="title"></slot>
         </div>
         <div class="-vert-sep" v-if="!no_separator"></div>
         <div class="-content" :class="content_classes">
            <slot name="content"></slot>
         </div>
      </div>
   </header>
</template>



<script>
export default {
   name: 'v-apu-section-header',


   props: {
   	'no_separator': {
   		type: Boolean,
         required: false,
         default: false
      },
      'title_class': {
   		type: String,
         required: false,
         default: null
      },
		'content_class': {
			type: String,
			required: false,
			default: null
		}
   },


   computed: {
   	title_classes(){
   		const classes = {};
   		if(this.title_class)
   			classes[this.title_class] = true;
   		return classes;
      },
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
.v-apu-section-header{
   display: grid;
   align-items: stretch;
   grid-template-columns: auto 1fr;
   grid-template-rows: auto;
   grid-template-areas:
      'bar ...';

   min-height: 3.4rem;
   /*width: 100%;*/
   overflow: visible;
}
.v-apu-section-header > .-bar{
   grid-area: bar;
}



.v-apu-section-header > .-bar{
   display: grid;
   align-items: center;
   grid-template-columns: auto 2.3em auto 0.5em max-content;
   grid-template-rows: auto;
   grid-template-areas:
      'title ... sep ... content';

   background-color: var(--m-grey-50);
   padding: 0.2rem 1.5rem 0.2rem var(--h-padding);

   border-bottom-right-radius: 4rem;
   border-top-right-radius: 4rem;

   box-shadow: 0 4px 12px -2px rgba(0,0,0,0.1);
}
.v-apu-section-header > .-bar > .-title{
   grid-area: title;
}
.v-apu-section-header > .-bar > .-vert-sep{
   grid-area: sep;
}
.v-apu-section-header > .-bar > .-content{
   grid-area: content;
}


.v-apu-section-header > .-bar > .-title{
   user-select: none;
   cursor: default;

   font-family: 'Roboto Medium', sans-serif;
   letter-spacing: 0.06em;
   font-size: 1rem;
}
.v-apu-section-header > .-bar > .-vert-sep{
   width: 1px;
   height: 60%;
   background-color: var(--m-grey-300);
}
.v-apu-section-header > .-bar > .-content{
   display: flex;
   flex-direction: row;
   align-items: center;

   font-family: 'Roboto Medium', sans-serif;
   letter-spacing: 0.06em;
   font-size: 1rem;
}
</style>
