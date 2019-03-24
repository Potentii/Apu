<template>
   <div class="v-message-sender-view" v-shortkey.once="['ctrl', 's']" @shortkey="onCtrlS($event)">

      <!-- * Form template * -->
      <template v-if="selected_saved_connection && selected_queue">


         <!-- * Section header * -->
         <v-apu-section-header class="-header" title_class="-header-title" content_class="-header-content">

            <!-- * Model name * -->
            <span class="-title" slot="title">
               <!-- * Name * -->
               <span class="-name">{{ !!selected_snippet ? selected_snippet.name : 'New message' }}</span>
               <!-- * Changes indicator * -->
               <v-apu-indicator class="-changes-indicator" :hidden="!has_changes" title="There are unsaved changes"></v-apu-indicator>
            </span>


            <!-- * Model controls * -->
            <div class="-controls" slot="content">

               <v-btn class="-control -save"
                      v-if="!!selected_snippet"
                      :disabled="!has_changes"
                      @click="updateSnippetContent"
                      dense
                      flat
                      title="Save this model">
                  Save
               </v-btn>

               <v-btn class="-control -new"
                      @click="openSnippetCreationDialog"
                      dense
                      flat
                      title="Create a new model">
                  {{ hasAnySnippet() ? 'New' : 'Create new model' }}
               </v-btn>

               <v-snippets-combobox class="-control -snippets"
                                    v-if="hasAnySnippet()"
                                    v-model="selected_snippet"
                                    title="Load a model">
               </v-snippets-combobox>

               <v-btn class="-control -delete"
                      v-if="!!selected_snippet"
                      @click="openDeleteSnippetDialog"
                      dense
                      flat
                      title="Remove this model">
                  <i class="material-icons">delete</i>
               </v-btn>

            </div>

         </v-apu-section-header>


         <!-- * Content * -->
         <v-faded-viewport class="-main" content_class="-main-content">

            <!-- * Message form * -->
            <form class="-send-message-form" ref="form" v-id @submit.prevent="_onSubmit">

               <!-- * Correlation ID * -->
               <div class="field">
                  <label class="-label">Correlation ID</label>
                  <input class="-input -corr-id" type="text" v-model="form.correlation_id"/>
               </div>


               <!-- * Message field * -->
               <div class="field">
                  <label class="-label">Message</label>
                  <textarea class="-input -message" v-model="form.message"></textarea>
               </div>

            </form>

         </v-faded-viewport>


         <!-- * FABs list * -->
         <ul class="fab-list">

            <!-- * Send message FAB * -->
            <button class="fab --raised" :form="$refs.form ? $refs.form.id : null" :disabled="states.is('sending') || !valid">
               <i class="material-icons" v-if="states.not('sending')">send</i>
               <span class="-spinner" v-else><md-progress-spinner md-mode="indeterminate" :md-diameter="28" :md-stroke="3"></md-progress-spinner></span>
            </button>

         </ul>

      </template>


      <!-- * Loading template * -->
      <template v-else>
         Loading form...
      </template>

   </div>
</template>



<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import ConnectionResolverMixin from '/app/connection/v-connection-resolver-mixin'
import QueueResolverMixin from '/app/queue/v-queue-resolver-mixin'
import UIMessage         from '/app/ui-messages/ui-message'
import Message           from '../message'
import * as ipc          from './ipc'
import TimeoutError      from '/infra/timeout-error'
import States            from '/infra/states/states';
import VSnippetsCombobox from '/app/snippet/v-snippets-combobox';
import VApuSectionHeader from '/infra/ui/v-apu-section-header';
import VApuIndicator     from '/infra/ui/v-apu-indicator';
import SnippetVO         from '../../snippet/snippet-vo';
import AskButtonInfo     from '../../../infra/ui/dialogs/ask-button-info';
import VFadedViewport    from '../../../infra/ui/v-faded-viewport';



export default {

   name: 'v-message-sender-view',
	components: { VFadedViewport, VApuIndicator, VApuSectionHeader, VSnippetsCombobox },
	mixins: [
      ConnectionResolverMixin,
      QueueResolverMixin
   ],


   data(){
      return {
      	states: new States(),

         /**
          * The currently selected snippet, or null if none is selected
          * @type {SnippetVO}
          */
         selected_snippet: null,

         form: {
            correlation_id: '',
            message: ''
         }
      };
   },


   computed: {
      ...mapState('connection', [ 'selected_saved_connection' ]),
		...mapState('snippet', [ 'new_snippet_name' ]),
      ...mapState('queue', [ 'selected_queue' ]),
      ...mapGetters('snippet', [ 'hasAnySnippet' ]),


      /**
       * Indicates whether the message form is valid or not
       * @type {Boolean} True if valid, false otherwise
       */
      valid(){
			return !!this.form.message;
		},


      /**
       * Indicates that there are changes made to the selected snippet
       * @type {Boolean} True if there are changes, false otherwise
       */
      has_changes(){
			const snippet = this.selected_snippet;
			if(!!snippet){
            const message = this.form.message;
				return !snippet.hasEquivalentContent(message);
			}
			return false;
      }
   },


   watch: {
   	/**
       * Reacts to snippet selection changes
       * It will load the snippet content (if any) into the form
       */
   	async selected_snippet(new_val, old_val){
			// TODO add loading animation and block the form?

   		if((!new_val || !old_val))
				await this.loadSelectedSnippetMessage(new_val);
   		else if(new_val._id != old_val._id)
            await this.loadSelectedSnippetMessage(new_val);
      }
   },


   methods: {
      ...mapActions('ui-messages', { 'addUIMessage': 'addMessage' }),
		...mapActions('queue', [ 'setQueueAsUsedNow' ]),
      ...mapMutations('snippet', [ 'setNewSnippetName' ]),
		...mapActions('snippet', [ 'addSnippet', 'removeSnippet' ]),


      async _onSubmit(){
			this.states.remove('error');
         this.states.add('sending');

         // *Trimming the correlation ID, if it has been set:
         const trimmed_correlation_id = (!!this.form.correlation_id)
            ? this.form.correlation_id.trim()
            : this.form.correlation_id;

         const message = new Message(
            this.selected_queue.name,
				trimmed_correlation_id,
            this.form.message
         );

         try{
         	// *Sending the message to the queue:
				await ipc.sendMessage(this.selected_saved_connection.data, message);
				// *Setting this queue as used now:
				this.setQueueAsUsedNow(this.selected_queue);
				// *Showing a success message to the user:
				this.addUIMessage(new UIMessage(UIMessage.INFO, `Message sent`));
			} catch(err){
				this.states.add('error');
				if(err instanceof TimeoutError){
					this.addUIMessage(new UIMessage(UIMessage.ERROR, `The MQ server took too long to respond`));
				} else{
					this.addUIMessage(new UIMessage(UIMessage.ERROR, `An error happened:`, `${err.message}`, 12000));
					console.error(err);
				}
			} finally{
				this.states.remove('sending');
         }
      },


      /**
       * Updates which snippet should be selected
       * @param {SnippetVO} snippet
       */
      async setSelectedSnippet(snippet){
      	this.selected_snippet = snippet;
      },


		/**
		 * Loads the given snippet into the form
		 * @param {SnippetVO} [selected_snippet] The snippet to be loaded
		 * @returns {Promise<void>}
		 */
      async loadSelectedSnippetMessage(selected_snippet){
      	if(!selected_snippet)
      		this.form.message = '';
         else
            this.form.message = selected_snippet.content;
      },


		/**
       * Creates a new snippet from the message content
		 * @param {String} name The name of the snippet
		 * @param {String} message_str The content of the original message
		 * @returns {Promise<SnippetVO>} The created snippet
		 */
		async createNewSnippetFromMessage(name, message_str){
			// *Creating the new snippet:
         const new_snippet = new SnippetVO(name, message_str, null);
         // *Adding the snippet on cache and store:
         await this.addSnippet(new_snippet);
         // *Returning the created snippet:
         return new_snippet;
      },


		async updateSnippetContent(){
			if(!this.selected_snippet)
				throw new Error(`Cannot update snippet: no snippets are selected`);

			this.selected_snippet.content = this.form.message;

         // TODO loading animation?
			await this.selected_snippet.saveOnCache();
      },


		async onCtrlS(e){
			if(!!this.selected_snippet && !!this.has_changes)
				await this.updateSnippetContent();
      },


		async openSnippetCreationDialog(){
			this.setNewSnippetName(null);
			this.openDialog('new-snippet-dialog', null, async snippet_name => {
				if(!!this.new_snippet_name){
					const snippet = await this.createNewSnippetFromMessage(this.new_snippet_name, this.form.message);
					this.setNewSnippetName(null);
					await this.setSelectedSnippet(snippet);
					this.addUIMessage(new UIMessage(UIMessage.SUCCESS, `New model created`, null, 8000));
				}
         });
      },


		async openDeleteSnippetDialog(){
			const snippet = this.selected_snippet;

			const data = {
				header: `Remove model`,
				text: `Are you sure to permanently remove the "${snippet.name}" model?`,
            buttons: [
               new AskButtonInfo('Cancel', AskButtonInfo.TYPES.NEUTRAL),
					new AskButtonInfo('Remove', AskButtonInfo.TYPES.NEGATIVE)
            ]
         };
			this.openDialog('ask-dialog', data, async button => {
				if(button && button._id == data.buttons[1]._id){
					await this.removeSnippet(snippet);
					this.selected_snippet = null;
				}
			});
      }

   }

}
</script>



<style>
.v-message-sender-view{
   display: flex;
   flex-direction: column;
   height: 100%;
}


.v-message-sender-view > .-header{
   position: absolute;
   z-index: 4;
}

.v-message-sender-view > .-header .-header-title > .-title{
   cursor: default;
}
.v-message-sender-view > .-header .-header-title > .-title > .-name{
   font-size: 1.2em;
}

.v-message-sender-view > .-header .-header-title > .-title > .-changes-indicator{
   --v-apu-indicator-background: var(--m-blue-700);
   position: absolute;
   right: -0.8em;
   top: -0.1em;
}

.v-message-sender-view > .-header .-header-content > .-controls > .-control,
.v-message-sender-view > .-header .-header-content > .-controls > .-control.v-menu > .v-menu__activator > *{
   border-radius: 3rem;
   min-width: max-content;
}

.v-message-sender-view > .-header .-header-content > .-controls > .-delete{
   background-color: var(--m-red-a400);
   color: var(--m-grey-50);
   box-shadow: 0 3px 18px -5px var(--m-red-a400);
}
.v-message-sender-view > .-header .-header-content > .-controls > .-delete .material-icons{
   font-size: 1.4em;
}


.v-message-sender-view > .-main{
   flex-grow: 1;
   height: 100%;
}
.v-message-sender-view > .-main .-main-content{
   display: flex;
   flex-direction: column;

   padding-top: 4.5rem;
   padding-bottom: 5rem;

   overflow: auto;
}

.v-message-sender-view > .-main .-main-content > .-send-message-form{
   display: grid;
   grid-row-gap: 1.5em;
   grid-template-areas:
      'corr-id'
      'message';
   /*padding: 1rem var(--h-padding) 6rem var(--h-padding);*/
   padding-right: var(--h-padding);
   padding-left: var(--h-padding);
}

.v-message-sender-view > .-main .-main-content > .-send-message-form > .field > .-input.-corr-id,
.v-message-sender-view > .-main .-main-content > .-send-message-form > .field > .-input.-message{
   font-family: 'Roboto Mono', monospace;
}
.v-message-sender-view > .-main .-main-content > .-send-message-form > .field > .-input.-message{
   /*white-space: pre-wrap;*/
   white-space: nowrap;
   resize: vertical;
   min-height: 10em;
   height: 20em;
   font-size: 0.9em;
   line-height: 1.7em;
}



.v-message-sender-view > .fab-list{
   z-index: 8;
}

.v-message-sender-view > .fab-list > .fab > .-spinner{
   display: flex;
   align-content: center;
}
.v-message-sender-view > .fab-list > .fab > .-spinner .md-progress-spinner{
   --md-theme-default-primary: var(--m-grey-100);
}
</style>
