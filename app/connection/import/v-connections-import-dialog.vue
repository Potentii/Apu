<template>
   <div class="v-connections-import-dialog">
      <v-dialog-window class="-dialog-window">

         <template slot="header">
            <span class="-header-title">Import connections</span>
         </template>


         <template slot="content">
            <form class="-content-form" ref="form" v-id @submit.prevent="_onSubmit($event)">
               <ul class="-connections" v-if="connections_selection && connections_selection.length">
                  <v-connections-import-item class="-connection" :selection="selection" v-for="selection in connections_selection"></v-connections-import-item>
               </ul>
               <span v-else>No connections found to be imported</span>
            </form>
         </template>


         <template slot="footer">

            <v-dialog-controls class="-footer-controls">

               <!-- * Cancel button * -->
               <md-button class="-control --neutral"
                          type="button"
                          @click="$emit('input', null);$emit('dismiss')">
                  <span class="-label">Cancel</span>
               </md-button>


               <!-- * OK button * -->
               <md-button class="-control --positive"
                          :disabled="!connections_selection || !connections_selection.length"
                          type="submit"
                          :form="$refs.form ? $refs.form.id : null"
                          :title="'Import \'' + _getSelectedConnections(connections_selection).length + '\' connection(s)'">
                  <span class="-label">Import</span>
               </md-button>

            </v-dialog-controls>

         </template>

      </v-dialog-window>

   </div>
</template>



<script>
import VDialogWindow          from '/infra/ui/dialogs/v-dialog-window';
import VDialogControls        from '/infra/ui/dialogs/v-dialog-controls';
import VConnectionsImportItem from './v-connections-import-item';
import ImportSelection        from './import-selection';



export default {
   name: 'v-connections-import-dialog',


	components: { VConnectionsImportItem, VDialogControls, VDialogWindow },


	props: {
		/**
       * The connections to be imported
       * @type {SavedConnection[]}
		 */
		'data': {
   		type: Array,
         required: false,
         default: null
      }
   },


   data(){
   	return {
   		connections_selection: []
      };
   },


	watch: {
		data(v){
         this.connections_selection = this._convertConnectionsToSelection(v);
		}
	},


   mounted(){
		this.connections_selection = this._convertConnectionsToSelection(this.data);
   },


   methods: {
   	_onSubmit(e){
   		const connections_to_import = this._getSelectedConnections(this.connections_selection);
         this.$emit('input', connections_to_import);
         this.$emit('dismiss', connections_to_import);
      },

      _convertConnectionsToSelection(connections){
   		if(!Array.isArray(connections))
   			return [];

			return connections.map(conn => new ImportSelection(conn, true));
      },

      _getSelectedConnections(selections){
   		if(!Array.isArray(selections))
   			return [];

   		return selections
				.filter(selection => !!selection.is_selected)
				.map(selection => selection.data);
      }

   }
}
</script>



<style>
.v-connections-import-dialog{
   display: flex;
   justify-items: center;
   align-items: center;

   min-width: 50%;
   width: max-content;
   max-width: 75%;

   min-height: 30%;
   height: 80%;
   max-height: 80%;

   overflow: hidden;
}

.v-connections-import-dialog > .-dialog-window .-header-title{
   display: inline-block;
   font-family: 'Roboto', sans-serif;
   font-weight: 500;
   font-size: 20px;
}

.v-connections-import-dialog > .-dialog-window .-content-form{
   display: flex;
   flex-direction: column;
   align-items: stretch;
}

.v-connections-import-dialog > .-dialog-window .-content-form > .-connections{
   display: flex;
   flex-direction: column;
   align-items: stretch;
}

.v-connections-import-dialog > .-dialog-window .-content-form > .-connections > .-connection + .-connection{
   margin-top: 1em;
}




</style>
