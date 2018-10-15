<template>
   <div class="v-queues-view">

      <h1 class="-view-section-title -title">
         <span class="-title">Queues</span>
         <md-button class="-refresh md-dense" type="button" @click="loadQueues" :disabled="states.is('loading')">
            <span v-if="states.not('loading')">Refresh</span>
            <!--<md-icon v-if="states.not('loading')">refresh</md-icon>-->
            <span class="-spinner" v-else>
               <md-progress-spinner md-mode="indeterminate" :md-diameter="24" :md-stroke="3"/>
            </span>
         </md-button>
      </h1>

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

   </div>
</template>



<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import QueuesList               from './v-queues-list'
import ConnectionResolverMixin  from '/app/connection/v-connection-resolver-mixin'
import UIMessage                from '/app/ui-messages/ui-message'
import TimeoutError             from '/infra/timeout-error'
import States                   from '/infra/states/states';



export default {

   name: 'v-queues-view',

   mixins: [
      ConnectionResolverMixin
   ],

   components: {
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
   height: 100%;
}
.v-queues-view > .v-queues-list{
   margin-top: 1rem;
   margin-bottom: 4rem;
}



.v-queues-view > .-title{
   display: grid;
   grid-template-columns: auto 1fr auto;
   grid-template-areas:
      'title ... refresh';
   align-items: center;
}
.v-queues-view > .-title > .-title{
   grid-area: title;
}
.v-queues-view > .-title > .-refresh{
   grid-area: refresh;
}

.v-queues-view > .-list-group + .-list-group{
   margin-top: 1em;
}

.v-queues-view > .-title > .-refresh .-spinner .md-progress-spinner{
   --md-theme-default-primary: var(--m-grey-600);
}
</style>
