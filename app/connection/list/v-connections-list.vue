<template>
   <ul class="v-connections-list">
      <router-link
         class="-connection"
         tag="li"
         :key="saved_connection.id"
         :to="'/index/connections/' + saved_connection.name + '/queues'"
         v-for="saved_connection in connections">

         <!-- * Location info * -->
         <div class="-location">
            <span class="-manager">{{ saved_connection.data.queue_manager }}</span>
            <span class="-at">@</span>
            <span class="-url">{{ saved_connection.data.host }}<span v-if="saved_connection.data.port">:{{ saved_connection.data.port }}</span></span>
            <span class="-channel" v-if="saved_connection.data.channel">({{ saved_connection.data.channel }})</span>
         </div>


         <!-- * Connection name * -->
         <span class="-name">{{ saved_connection.name }}</span>


         <!-- * Controls panel * -->
         <div class="-controls">

            <!-- * Remove connection * -->
            <v-fab-button class="-remove -control"
                          type="button"
                          @click.stop="_openRemoveConnectionDialog(saved_connection)"
                          title="Remove connection"
                          flat>
               <i class="material-icons">delete</i>
            </v-fab-button>

         </div>

      </router-link>
   </ul>
</template>



<script>
import { mapActions } from 'vuex'
import UIMessage      from '/app/ui-messages/ui-message'
import VFabButton     from '/infra/ui/v-fab-button'
import AskButtonInfo  from '/infra/ui/dialogs/ask-button-info'



export default {

   name: 'v-connections-list',


	components: { VFabButton },


	props: {
      /**
       * The saved connections to be displayed
       * @type {SavedConnection[]}
       */
      'connections': {
         type: Array,
         required: true
      }
   },


   methods: {
		...mapActions('ui-messages', { 'addUIMessage': 'addMessage' }),
   	...mapActions('connection', [ 'removeSavedConnection' ]),


		async _openRemoveConnectionDialog(connection){
			const data = {
				header: `Remove connection`,
				text: `Are you sure to permanently remove the connection "${connection.name}" ?`,
				buttons: [
					new AskButtonInfo('Cancel', AskButtonInfo.TYPES.NEUTRAL),
					new AskButtonInfo('Remove', AskButtonInfo.TYPES.NEGATIVE)
				]
			};
			this.openDialog('ask-dialog', data, async button => {
				if(button && button.is_negative)
					await this._removeConnection(connection);
			});
		},


   	async _removeConnection(connection){
   		try{
				await this.removeSavedConnection(connection);
				this.addUIMessage(new UIMessage(UIMessage.SUCCESS, `Connection '${connection.name}' removed`, null, UIMessage.LIFE.SHORT));
         } catch(err){
				this.addUIMessage(new UIMessage(UIMessage.ERROR, `Error while removing the connection`, err.message, UIMessage.LIFE.LONG));
			}
      }
   }

}
</script>



<style>
.v-connections-list > .-connection{
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: auto;
   grid-row-gap: 0.3em;
   grid-template-areas:
      'location ... controls'
      'name ... controls';

   align-items: center;

   margin: 0 var(--h-padding);
   padding: 0.9em 1.4em;

   border-radius: 8px;
   background-color: var(--m-grey-50);

   box-shadow: 0 3px 10px -1px rgba(0, 0, 0, 0.08);

   overflow: hidden;

   transition: background-color, box-shadow, 0.2s ease;
} .v-connections-list > .-connection:hover{
   cursor: pointer;
   background-color: var(--m-grey-100);
   box-shadow: 0 3px 3px -1px rgba(0, 0, 0, 0.1);
}
.v-connections-list > .-connection + .-connection{
   margin-top: 1em;
}
.v-connections-list > .-connection > .-location{
   grid-area: location;
}
.v-connections-list > .-connection > .-name{
   grid-area: name;
}
.v-connections-list > .-connection > .-controls{
   grid-area: controls;
}


.v-connections-list > .-connection::before{
   content: '';
   position: absolute;
   opacity: 0.5;
   width: 6px;
   height: 100%;
   top: 0;
   left: 0;
   background-color: var(--m-grey-800);
   transition: opacity 0.2s ease;
} .v-connections-list > .-connection:hover::before{
   opacity: 1;
}


.v-connections-list > .-connection > .-location{
   display: flex;
   flex-direction: row;
   align-items: center;

   font-size: 10px;
   color: var(--m-grey-500);
   letter-spacing: 0.03em;
}
.v-connections-list > .-connection > .-location > .-manager{
   font-weight: bold;
   /*margin-right: 0.3em;*/
}
.v-connections-list > .-connection > .-location > .-at{
   margin: 0 0.3em;
}
.v-connections-list > .-connection > .-location > .-channel{
   font-style: italic;
   margin-left: 0.5em;
}

.v-connections-list > .-connection > .-controls{
   user-select: none;
   opacity: 0;
   transform: translateX(0.5em);
   transition: transform, opacity, 0.2s ease;
}
.v-connections-list > .-connection:hover > .-controls{
   opacity: 1;
   transform: translateX(0);
}

.v-connections-list > .-connection > .-controls > .-control{
   --v-fab-button-size: 2.8em;
   --v-fab-button-text-size: 1.4em;

   --v-fab-button-color: var(--m-grey-50);

   --v-fab-button-text-color: var(--m-grey-400);
   --v-fab-button-aura-color--hover: var(--m-red-a400);
}
.v-connections-list > .-connection > .-name{
   font-size: 20px;
   font-family: 'Roboto', sans-serif;
   font-weight: 500;
}
</style>
