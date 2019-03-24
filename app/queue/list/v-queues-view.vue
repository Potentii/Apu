<template>
   <div class="v-queues-view">


      <!-- * Section header * -->
      <v-apu-section-header class="-header" title_class="-header-title" content_class="-header-content">

         <!-- * Title * -->
         <span class="-title" slot="title">
            <span class="-name">Queues</span>
         </span>


         <!-- * Model controls * -->
         <div class="-controls" slot="content">

            <md-button class="-control -refresh"
                       @click="loadQueues"
                       :title="states.is('loading') ? 'Refreshing list...' : 'Refresh queues list'">
               <span v-if="states.not('loading')">Refresh</span>
               <span class="-spinner" v-else>
                  <md-progress-spinner md-mode="indeterminate" :md-diameter="24" :md-stroke="3"/>
               </span>
            </md-button>

         </div>

      </v-apu-section-header>


      <!-- * Content * -->
      <v-faded-viewport class="-main" content_class="-main-content">

         <div class="-empty" v-if="states.not('loading') && states.not('error') && isConnectionQueuesLoaded(selected_saved_connection) && !getQueuesOfConnection(selected_saved_connection).length">
            <span>No queues found</span>
         </div>


         <div class="-list-group -starred" v-if="getStarredQueuesOfConnection(selected_saved_connection).length">
            <v-queues-list class="-list" name="Favorite" :queues="getStarredQueuesOfConnection(selected_saved_connection)"/>
         </div>


         <div class="-list-group -last-used" v-if="getLastUsedQueuesOfConnection(selected_saved_connection).length">
            <v-queues-list class="-list" name="Last used" :queues="getLastUsedQueuesOfConnection(selected_saved_connection)"/>
         </div>


         <div class="-list-group -all" v-if="getQueuesOfConnection(selected_saved_connection).length">
            <v-queues-list class="-list" name="All queues" :queues="getQueuesOfConnection(selected_saved_connection)"/>
         </div>

      </v-faded-viewport>

   </div>
</template>



<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import QueuesList              from './v-queues-list'
import ConnectionResolverMixin from '/app/connection/v-connection-resolver-mixin'
import UIMessage               from '/app/ui-messages/ui-message'
import TimeoutError            from '/infra/timeout-error'
import States                  from '/infra/states/states';
import VApuSectionHeader       from '../../../infra/ui/v-apu-section-header';
import VFadedViewport          from '../../../infra/ui/v-faded-viewport';



export default {

   name: 'v-queues-view',

   mixins: [
      ConnectionResolverMixin
   ],

   components: {
		VFadedViewport,
		VApuSectionHeader,
      'v-queues-list': QueuesList
   },

   data(){
      return {
         states: new States()
      };
   },

   computed: {
      ...mapState('connection', [ 'selected_saved_connection' ]),
      ...mapGetters('queue', [
      	'isConnectionQueuesLoaded',

      	'getQueuesOfConnection',
         'getStarredQueuesOfConnection',
         'getLastUsedQueuesOfConnection'
      ])
   },

   beforeMount(){
      if(!this.isConnectionQueuesLoaded(this.selected_saved_connection))
         this.loadQueues();
   },

   methods: {
      ...mapActions('ui-messages', { 'addUIMessage': 'addMessage' }),
		...mapActions('queue', [ 'refreshQueuesOfConnectionFromMQ' ]),
		...mapMutations('queue', [ 'markConnectionAsLoaded', 'markConnectionAsNotLoaded' ]),

		async loadQueues(){
      	if(this.states.is('loading'))
      		return;

			this.states.remove('error');

			try{
				this.states.add('loading');
				this.markConnectionAsNotLoaded(this.selected_saved_connection);
				await this.refreshQueuesOfConnectionFromMQ(this.selected_saved_connection);
				this.markConnectionAsLoaded(this.selected_saved_connection);
			} catch(err){
				this.states.add('error');
				if(err instanceof TimeoutError){
					this.addUIMessage(new UIMessage(UIMessage.ERROR, `The MQ server took too long to respond`));
				} else if(err.reasonCode == 2538){
					// Cannot connect to MQ
					this.addUIMessage(new UIMessage(UIMessage.ERROR, `Could not connect to the MQ server (ERROR 2538)`));
				} else{
					this.addUIMessage(new UIMessage(UIMessage.ERROR, `Unexpected error (${err.message})`));
					console.error(err);
				}
			} finally{
				this.states.remove('loading');
			}
      }
   }

}
</script>



<style>
.v-queues-view{
   display: flex;
   flex-direction: column;
   height: 100%;
}



/**
 * Header
 */
.v-queues-view > .-header{
   position: absolute;
   z-index: 4;

}

.v-queues-view > .-header .-header-title > .-title{
   cursor: default;
}
.v-queues-view > .-header .-header-title > .-title > .-name{
   font-size: 1.2em;
}


.v-queues-view > .-header .-header-content > .-controls > .-control{
   border-radius: 3rem;
   min-width: max-content;
}
.v-queues-view > .-header .-header-content > .-controls > .-control.md-button .md-button-content{
   padding-right: 1em;
   padding-left: 1em;
}
.v-queues-view > .-header .-header-content > .-controls > .-refresh .-spinner .md-progress-spinner{
   --md-theme-default-primary: var(--m-grey-600);
}


.v-queues-view > .-main{
   flex-grow: 1;
   height: 100%;
}
.v-queues-view > .-main .-main-content{
   display: flex;
   flex-direction: column;

   padding-top: 4.5rem;
   padding-bottom: 5rem;

   overflow: auto;
}

.v-queues-view > .-main .-main-content > .-list-group + .-list-group{
   margin-top: 1em;
}
</style>
