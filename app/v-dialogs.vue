<template>
   <div class="v-dialogs">

      <v-p-dialog name="new-snippet-dialog">
         <v-snippet-creation-dialog v-model="_new_snippet_name" @dismiss="dismissDialog('new-snippet-dialog', $event)"/>
      </v-p-dialog>

      <v-p-dialog name="ask-dialog">
         <v-confirm-dialog slot-scope="{ intent }" :data="intent ? intent.data : null" @dismiss="dismissDialog('ask-dialog', $event)"/>
      </v-p-dialog>

   </div>
</template>



<script>
import { mapState, mapMutations } from 'vuex'
import VSnippetCreationDialog     from './snippet/v-snippet-creation-dialog';
import VConfirmDialog             from '/infra/ui/dialogs/v-ask-dialog';



export default {
   name: 'v-dialogs',


	components: { VConfirmDialog, VSnippetCreationDialog },


	computed: {
		_new_snippet_name: {
			set(v){
				this.setNewSnippetName(v);
			},
			get(){
				return this.new_snippet_name;
			}
		},

		...mapState('snippet', [ 'new_snippet_name' ])
	},


	methods: {
		...mapMutations('snippet', [ 'setNewSnippetName' ])
	}
}
</script>



<style>
</style>
