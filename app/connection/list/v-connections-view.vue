<template>
   <div class="v-connections-view">

      <template v-if="saved_connections && saved_connections.length">

         <!-- * Section header * -->
         <v-apu-section-header class="-header" title_class="-header-title" content_class="-header-content" no_separator>

            <!-- * Title * -->
            <span class="-title" slot="title">
               <span class="-name">Connections</span>
            </span>

         </v-apu-section-header>


         <!-- * Content * -->
         <v-faded-viewport class="-main" content_class="-main-content">

            <!-- * Connections listing * -->
            <v-connections-list :connections="saved_connections"></v-connections-list>

         </v-faded-viewport>


         <!-- * FABs * -->
         <v-fab-group enable_subs always_show_subs>

            <template slot="main">
               <!-- * New connection * -->
               <v-fab-button class="-add-connection"
                             title="Create new connection"
                             @click="$router.push({ name: 'new-connection' })">
                  <i class="material-icons">add</i>
               </v-fab-button>
            </template>


            <template slot="sub">
               <!-- * Import connections * -->
               <v-fab-button class="-import-connections"
                             title="Import connections"
                             @click="_import_onClick">
                  <i class="material-icons">publish</i>
               </v-fab-button>
            </template>

         </v-fab-group>

      </template>


      <!-- * No connections state * -->
      <template v-else>
         <div class="-no-connections-state">
            <!-- * No connections image * -->
            <!-- <img class="-no-connections-image" title="No saved connections were found"> -->

            <!-- * No connections text * -->
            <h1 class="-no-connections-text fx--blurred-title text--ui-label">Looks like there's <br>no connections in sight...</h1>

            <span class="-or">You can start by</span>

            <router-link class="-add-first-connection -call-button text--ui-label" tag="button" :to="{ name: 'new-connection' }">
               <i class="-icon material-icons">add_circle</i>
               <span class="-text">Creating your first one</span>
            </router-link>

            <span class="-or">or you can also</span>

            <button class="-import-connections -call-button text--ui-label" @click="_import_onClick">
               <i class="-icon material-icons">publish</i>
               <span class="-text">Import from file</span>
            </button>

         </div>
      </template>

   </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import ConnectionsList   from './v-connections-list'
import VApuSectionHeader from '../../../infra/ui/v-apu-section-header';
import VFadedViewport    from '../../../infra/ui/v-faded-viewport';
import VFabGroup         from '../../../infra/ui/v-fab-group';
import VFabButton        from '../../../infra/ui/v-fab-button';
import * as file_prompt  from '/infra/file/native-file-prompt'
import * as file_util    from '/infra/file/util'
import UIMessage         from '../../ui-messages/ui-message';
import SavedConnection   from '../saved-connection';
import * as naming_util  from '/infra/naming/util'



export default {

   name: 'v-connections-view',


   components: {
		VFabButton,
		VFabGroup,
		VFadedViewport,
		VApuSectionHeader,
      'v-connections-list': ConnectionsList
   },


   computed: {
      ...mapState('connection', [ 'saved_connections' ])
   },


   methods: {
		...mapActions('ui-messages', { 'addUIMessage': 'addMessage' }),
		...mapActions('connection', [ 'createNewSavedConnection' ]),

		async _import_onClick(){
			// *Prompting the user to select a connections file:
			const files = await file_prompt.prompt({
            title: 'Select a connections file',
            buttonLabel: 'Open',
            filters: [
               { name: 'Connection configuration', extensions: [ 'json' ] }
            ],
            properties: [ 'openFile' ]
         });

			// *Checking if the user have selected some file:
			if(!!files && !!files.length){
				// *If they have:
            try{
            	// *Reading the file content:
					const file_content = await file_util.readAsync(files[0], 'utf8');
					let connections = JSON.parse(file_content);
					// *If the file doesn't contain a list:
					if(!Array.isArray(connections))
						throw new Error(`Content must be a list of connections`);

					try{
						// *Casting the connections:
						connections = connections.map(SavedConnection.from);

						// *Opening the import dialog, so the user can select which connections should be imported:
                  this.openDialog(
                  	'import-connections-dialog',
                     { connections },
                     async connections_to_import => await this._processImportedConnections(connections_to_import));

					} catch(err){
						console.error(err);
						throw new Error(`The file must have connections information`);
					}
            } catch(err){
					console.error(err);
               if(err.code === 'ENOENT'){
						this.addUIMessage(new UIMessage(UIMessage.ERROR, `Cannot find connections file`, null, UIMessage.LIFE.SHORT));
               } else if(err.message.includes('in JSON at position')){
						this.addUIMessage(new UIMessage(UIMessage.ERROR, `Cannot load connections file`, `Corrupted content`, UIMessage.LIFE.LONG));
               } else{
						this.addUIMessage(new UIMessage(UIMessage.ERROR, `An error occurred while reading the file`, err.message, UIMessage.LIFE.LONG));
               }
				}

         }
      },


		/**
       * Processes the connections to be imported, and save them
		 * @param {SavedConnection[]} connections_to_import The connections to be imported
		 * @private
		 */
		async _processImportedConnections(connections_to_import){
			// *Checking if the user just cancelled the dialog:
			if(!connections_to_import)
			// *Doing nothing if they have:
				return;

			// *Checking if the user have selected 0 connections:
			if(!connections_to_import.length){
				// *Telling that no connections were imported:
				this.addUIMessage(new UIMessage(UIMessage.INFO, `No connections were imported`, null, UIMessage.LIFE.SHORT));
				return;
			}

			try{
				// *Renaming the connections to be imported, adding a version suffix if needed:
				const connection_names = this.saved_connections.map(c => c.name);
				for(let conn of connections_to_import){
					conn.name = naming_util.getWithNamingVersionSuffix(connection_names, conn.name);
					conn._id = conn.name;
					connection_names.push(conn.name);
				}

				// *Persisting the connections, and adding them to the store:
				for(let conn of connections_to_import)
					await this.createNewSavedConnection(conn);

				// *Displaying a success message:
            if(connections_to_import.length == 1)
               this.addUIMessage(new UIMessage(UIMessage.SUCCESS, `Connection successfully imported`, null, UIMessage.LIFE.SHORT));
            else
					this.addUIMessage(new UIMessage(UIMessage.SUCCESS, `${ connections_to_import.length } connections successfully imported`, null, UIMessage.LIFE.SHORT));
			} catch(err){
				// *Displaying a success message:
				this.addUIMessage(new UIMessage(UIMessage.ERROR, `Error while saving new connections`, err.message, UIMessage.LIFE.LONG));
			}
      }
   }

}
</script>



<style>
.v-connections-view{
   display: flex;
   flex-direction: column;
   height: 100%;
}


/**
 * Header
 */
.v-connections-view > .-header{
   position: absolute;
   z-index: 4;
}

.v-connections-view > .-header .-header-title > .-title{
   cursor: default;
}
.v-connections-view > .-header .-header-title > .-title > .-name{
   font-size: 1.2em;
}


.v-connections-view > .-main{
   flex-grow: 1;
   height: 100%;
}
.v-connections-view > .-main .-main-content{
   display: flex;
   flex-direction: column;

   padding-top: 4.5rem;
   padding-bottom: 10rem;

   overflow: auto;
}


.v-connections-view > .-no-connections-state{
   display: flex;
   flex-direction: column;
   align-items: center;

   height: 100%;

   padding: 4em 6em 1em 6em;

   overflow: auto;
}

.v-connections-view > .-no-connections-state > *{
   flex-shrink: 0;
}

.v-connections-view > .-no-connections-state > .-no-connections-image{
   width: 12em;
   height: 6em;

   margin-bottom: 1em;

   background-color: #FF00FF;

   overflow: hidden;

   object-fit: contain;
}

.v-connections-view > .-no-connections-state > .-no-connections-text{
   /*margin-bottom: 1em;*/
   text-align: center;
   line-height: 1.3em;
}

.v-connections-view > .-no-connections-state > .-call-button{
   --btn-height: 3.2em;

   display: flex;
   align-items: center;

   height: var(--btn-height);
   padding: 0 1.2em;

   font-size: 1.05em;

   color: var(--m-grey-50);
   background-color: var(--accent-bg--base);

   border-radius: calc(var(--btn-height) / 2);
   animation: add-first-connection-pulse 2s ease infinite;
   transition: box-shadow, transform, 0.2s ease;
} .v-connections-view > .-no-connections-state > .-call-button:hover{
   transform: scale(1.03);
     animation: none;
   box-shadow: 0 3px 10px 2px rgba(0, 230, 118, 0.2);
}

@keyframes add-first-connection-pulse {
   0%{
      box-shadow: 0 0 0 0 rgba(0, 230, 118, 0.8);
   }
   70%{
      box-shadow: 0 0 4px 10px rgba(0, 230, 118, 0);
   }
   100%{
      box-shadow: 0 0 0 0 rgba(0, 230, 118, 0);
   }
}

.v-connections-view > .-no-connections-state > .-call-button > .-icon{
   margin-right: 0.3em;
   font-size: 1.65em;
   text-shadow: 0 2px 7px rgba(0, 0, 0, 0.12);
}
.v-connections-view > .-no-connections-state > .-call-button > .-text{
   font-weight: 600;
}

.v-connections-view > .-no-connections-state > .-import-connections{
   box-shadow: 0 3px 10px -1px rgba(0, 230, 118, 0.2);
}



.v-connections-view > .-no-connections-state > .-or{
   cursor: default;
   user-select: none;
   display: inline-block;
   font-size: 14px;
   margin: 1.8em 0;
   /*text-transform: uppercase;*/
   font-weight: bold;
   color: var(--m-grey-700);
}

</style>
