<template>
   <div class="v-p-dialog">
      <div class="-container" v-if="show_dialog">
         <div class="-overlay" ref="overlay" @click="onOverlayClick($event)">
            <slot :intent="intent"></slot>
         </div>
      </div>
   </div>
</template>



<script>
import { mapGetters, mapActions } from 'vuex'



export default{
   name:'v-p-dialog',


   props: {
   	'name': {
			type: String,
			required: true
      }
   },


   data(){
      return {
         show_dialog: false,
			intent: null
      };
   },


   computed: {
   	...mapGetters('-modals-plugin', [ 'getDialogIntent' ])
   },


   beforeMount(){
   	this.$store.watch(
   		this.getDialogIntent.bind(this, this.name),
         intent => {
   			if(!!intent)
   				this._show();
            else
					this._hide();

   			this.intent = intent;
			});
   },


   methods: {
   	...mapActions('-modals-plugin', [ 'openDialog', 'dismissDialog' ]),


      onOverlayClick(e){
         if(this.show_dialog && e.target === this.$refs.overlay)
            this.dismiss(null);
      },


      async open(data, onDismiss){
			await this.openDialog({ dialog_name: this.name, data: data, onDismiss: onDismiss });
      },


		async dismiss(data){
			await this.dismissDialog({ dialog_name: this.name, data: data });
		},


		_show(){
			if(!this.show_dialog)
            this.show_dialog = true;
		},


      _hide(){
			if(this.show_dialog)
				this.show_dialog = false;
      }
   }
}
</script>



<style>
.v-p-dialog{
   z-index: 14;
}
.v-p-dialog > .-container{
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;
}
.v-p-dialog > .-container > .-overlay{
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 100%;

   background-color: rgba(0, 0, 0, 0.3);

   animation-name: v-p-dialog-overlay-fade-in;
   animation-duration: 0.2s;
   animation-fill-mode: backwards;
   animation-timing-function: linear;
}
@keyframes v-p-dialog-overlay-fade-in {
   0% {
      background-color: rgba(0,0,0,0);
   }
}


/*.v-p-dialog > .-container > .-overlay > .-window{*/

   /*display: grid;*/
   /*align-items: center;*/
   /*grid-template-columns: 1fr minmax(auto, 80%) 1fr;*/
   /*grid-template-rows: auto;*/
   /*grid-template-areas:*/
      /*'... content ...';*/

   /*height: 100%;*/
   /*width: 100%;*/


   /*animation-name: v-p-dialog-window-fade-in;*/
   /*!*animation-delay: 0.2s;*!*/
   /*animation-duration: 0.15s;*/
   /*animation-fill-mode: backwards;*/
   /*animation-timing-function: ease-out;*/
/*}*/
/*@keyframes v-p-dialog-window-fade-in {*/
   /*0% {*/
      /*opacity: 0.3;*/
      /*!*transform: translateY(calc(50vh + 50%)) scaleX(0.6);*!*/
      /*transform: scaleX(0.7);*/
   /*}*/
/*}*/

/*.v-p-dialog > .-container > .-overlay > .-window > *{*/
   /*grid-area: content;*/
/*}*/
</style>
