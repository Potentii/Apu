<template>
   <div class="v-ask-dialog">

      <v-dialog-window class="-dialog-window"
                       :headerless="!data.header"
                       v-shortkey.once="{ enter: ['enter'], esc: ['esc'] }"
                       @shortkey.native="onShortcut($event)">

         <template slot="header">
            <span class="-header-text">{{ data.header }}</span>
         </template>

         <template slot="content">
            <span class="-content-text">{{ data.text }}</span>
         </template>


         <template slot="footer">

            <v-dialog-controls class="-footer-controls">

               <!-- * Buttons * -->
               <md-button class="-control --neutral"
                          :class="{ '--negative': button.is_negative, '--neutral': button.is_neutral, '--positive': button.is_positive }"
                          type="button"
                          @click="$emit('dismiss', button)"
                          :title="button.label"
                          v-for="button in data.buttons">
                  <span class="-label" :class="{ 'material-icons': button.is_icon }">{{ button.label }}</span>
               </md-button>

            </v-dialog-controls>

         </template>

      </v-dialog-window>

   </div>
</template>



<script>
import VDialogWindow   from './v-dialog-window';
import VDialogControls from './v-dialog-controls';



export default {
   name: 'v-ask-dialog',


   components: { VDialogControls, VDialogWindow },


   props: {
      'data': {
   		type: Object,
         required: true
      }
   },


   methods: {

		onShortcut(e){
		   switch(e.srcKey){
         case 'enter':
				this.onEnter(e);
         	break;
         case 'esc':
         	this.onEsc(e);
         	break;
			}
      },


   	onEnter(e){
   		const positive_button = (this.data.buttons || []).find(b => b.is_positive);
			if(!!positive_button){
            this.$emit('dismiss', positive_button);
            return;
         }

			const negative_button = (this.data.buttons || []).find(b => b.is_negative);
			if(!!negative_button){
				this.$emit('dismiss', negative_button);
				return;
			}

      },


      onEsc(e){
   		this.$emit('dismiss', null);
      }
   }
}
</script>



<style>
.v-ask-dialog{
   display: flex;
   justify-items: center;
   align-items: center;

   min-width: 50%;
   width: max-content;
   max-width: 70%;

   min-height: 30%;
   height: max-content;
   max-height: 70%;

   overflow: visible;
}
.v-ask-dialog > .-dialog-window .-header-text{
   display: inline-block;
   font-family: 'Roboto', sans-serif;
   font-weight: 500;
   font-size: 20px;
}
.v-ask-dialog > .-dialog-window .-content-text{
   font-size: 16px;
   line-height: 1.8em;
}
</style>
