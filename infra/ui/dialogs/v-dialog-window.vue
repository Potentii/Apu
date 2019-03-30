<template>
   <div class="v-dialog-window">

      <!-- * Dialog header * -->
      <header class="-header" v-if="!headerless">
         <slot name="header"></slot>
      </header>


      <!-- * Dialog content * -->
      <main class="-content" v-if="!contentless">
         <slot name="content"></slot>
      </main>


      <!-- * Dialog footer * -->
      <footer class="-footer" v-if="!footerless">
         <slot name="footer"></slot>
      </footer>

   </div>
</template>



<script>
export default {
   name: 'v-dialog-window',


   props: {
   	'headerless': {
   		type: Boolean,
         required: false
      },

		'contentless': {
			type: Boolean,
			required: false
		},

		'footerless': {
			type: Boolean,
			required: false
		},
   }
}
</script>



<style>
.v-dialog-window{
   display: grid;
   grid-template-rows: auto 1fr auto;
   grid-template-columns: 1fr;
   grid-template-areas:
      'header'
      'content'
      'footer'
   ;
   flex-direction: column;


   justify-content: stretch;

   width: 100%;
   height: 100%;

   padding: 1.3em 0;

   background-color: var(--blank-bg--base);
   border-radius: 10px;

   box-shadow: 0 4px 20px -1px rgba(0,0,0,0.2);

   overflow: hidden;
}
.v-dialog-window > .-header{
   grid-area: header;
}
.v-dialog-window > .-content{
   grid-area: content;
}
.v-dialog-window > .-footer{
   grid-area: footer;
}



.v-dialog-window > .-header{
   cursor: default;
   user-select: none;
   margin-bottom: 1.5em;
   padding: 0 1.5em;
}

.v-dialog-window > .-content{
   overflow-y: auto;
   padding: 0 1.5em;
}

.v-dialog-window > .-footer{
   margin-top: 2em;
   padding: 0 1.5em;
}
</style>
