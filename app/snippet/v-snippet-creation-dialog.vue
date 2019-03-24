<template>
   <div class="v-snippet-creation-dialog">
      <v-dialog-window class="-dialog-window">

         <template slot="header">
            <span class="-header-title">New model</span>
         </template>


         <template slot="content">
            <form class="-content-form" ref="form" v-id @submit.prevent="_onSubmit($event)">
               <!-- * Message field * -->
               <div class="field">
                  <label class="-label">Model name</label>
                  <input class="-input -name" ref="name_input" type="text" v-model="form.name"/>
               </div>

               <transition :duration="{ enter: 200, leave: 300 }">
                  <span class="-error" v-if="!!this.form.name && !valid">{{ error }}</span>
               </transition>

            </form>
         </template>


         <template slot="footer">

            <v-dialog-controls class="-footer-controls">

               <!-- * Cancel button * -->
               <md-button class="-control --neutral"
                          type="button"
                          @click="$emit('input', null);$emit('dismiss')">
                  <!--<i class="-icon material-icons">ok</i>-->
                  <span class="-label">Cancel</span>
               </md-button>


               <!-- * OK button * -->
               <md-button class="-control --positive"
                          type="submit"
                          :form="$refs.form ? $refs.form.id : null"
                          :disabled="!valid"
                          title="Create new model">
                  <!--<i class="-icon material-icons">ok</i>-->
                  <span class="-label">Create</span>
               </md-button>

            </v-dialog-controls>

         </template>

      </v-dialog-window>

   </div>
</template>



<script>
import { mapState }    from 'vuex'
import VDialogWindow   from '../../infra/ui/dialogs/v-dialog-window';
import VDialogControls from '../../infra/ui/dialogs/v-dialog-controls';



export default {
   name: 'v-snippet-creation-dialog',


	components: { VDialogControls, VDialogWindow },


	props: {
		/**
       * The name of the new snippet being created
       * @type {String}
		 */
		'value': {
   		type: String,
         required: false,
         default: null
      }
   },


   data(){
   	return {
   		form: {
   			name: this.value
         },
         error: null
      };
   },


   computed: {
   	...mapState('snippet', [ 'snippets' ]),


		valid(){
			this.error = null;

			if(!this.form.name || !this.form.name.trim()){
				this.error = `Invalid model name`;
				return false;
			}

			if(!!this.snippets && this.snippets.some(s => s.name === this.form.name.trim())){
				this.error = `A model with this name already exists`;
				return false;
			}

			return true;
		}
   },


	watch: {
		value(v){
			this.form.name = v;
		}
	},


	mounted(){
		const input = this.$refs.name_input;
		if(input)
			input.select();
	},


   methods: {
   	_onSubmit(e){
   		if(this.valid){
				this.$emit('input', this.form.name.trim());
				this.$emit('dismiss', this.form.name.trim());
         }
      }

   }
}
</script>



<style>
.v-snippet-creation-dialog{
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


.v-snippet-creation-dialog > .-dialog-window .-content-form{
   display: flex;
   flex-direction: column;
   align-items: stretch;

   width: 100%;
}
.v-snippet-creation-dialog > .-dialog-window .-content-form > .-error{
   display: block;
   margin-top: 1.2em;
   font-style: italic;
   font-size: 14px;
   color: var(--m-red-a400);
}
.v-snippet-creation-dialog > .-dialog-window .-content-form > .-error.v-enter-active{
   animation-name: v-snippet-creation-dialog-form-error-fade;
   animation-duration: 0.2s;
   animation-timing-function: ease;
   animation-fill-mode: both;
}
.v-snippet-creation-dialog > .-dialog-window .-content-form > .-error.v-leave-active{
   animation-name: v-snippet-creation-dialog-form-error-fade;
   animation-duration: 0.3s;
   animation-timing-function: ease;
   animation-fill-mode: both;
   animation-direction: reverse;
}

@keyframes v-snippet-creation-dialog-form-error-fade {
   0%{
      opacity: 0;
      transform: translateX(-0.8em);
   }
}



.v-snippet-creation-dialog > .-dialog-window .-header-title{
   display: inline-block;
   font-family: 'Roboto Medium', sans-serif;
   font-size: 20px;
}
</style>
