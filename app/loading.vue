<template>
   <div class="v-loading-page">
      <div class="-content">
         <span class="-message">{{ message }}</span>
         <div class="-spinner-container">
            <div class="-spinner">
               <md-progress-spinner md-mode="indeterminate" :md-diameter="64" :md-stroke="5"/>
            </div>
         </div>
      </div>
   </div>
</template>



<script>
import { mapMutations, mapActions } from 'vuex'
import QueueRoot                    from './queue/queue-root'
import * as all_migrations          from '/data/migrations/version/renderer/all'
import UIMessage                    from './ui-messages/ui-message';



export default {

   name: 'v-loading-page',


   data(){
      return {
         message: ''
      };
   },


   mounted(){
      this.load();
   },


   methods: {
		...mapMutations('queue', [ 'setQueues' ]),
      ...mapActions('connection', [ 'refreshSavedConnectionsFromCache' ]),
		...mapActions('snippet', [ 'loadSnippetsFromCache' ]),
		...mapActions('ui-messages', { 'addUIMessage': 'addMessage' }),


      async loadPreferences(){

      },


      async load(){
			try{
            this.message = 'Migrating data';
            await this._processVersionMigrations();
            this.message = 'Loading preferences';
            await this.loadPreferences();
            this.message = 'Loading saved connections';
            await this.refreshSavedConnectionsFromCache();
            this.message = 'Loading saved models';
            await this.loadSnippetsFromCache();

            this.setQueues(await QueueRoot.loadQueuesFromCache());

            const redirect_to = this.$route.params.redirect_to;
            if(redirect_to)
               this.$router.replace({
                  name: redirect_to.name,
                  params: redirect_to.params,
                  hash: redirect_to.hash,
                  query: redirect_to.query
               });
            else
               this.$router.push({ name: 'connections' });
			} catch(err){
				console.error(err);
				this.addUIMessage(new UIMessage(UIMessage.ERROR, `Loading error:`, `${err.message}`, UIMessage.LIFE.LONG));
			}
      },

      async _processVersionMigrations(){
			try{
				await all_migrations.migrate();
         } catch(err){
            throw new Error(`Error while migrating data: ${err.message}`);
         }
      }
   }
}
</script>



<style>
.v-loading-page{
   width: 100%;
   height: 100%;
}
.v-loading-page > .-content{
   /*display: flex;*/
   /*justify-content: center;*/
   /*align-items: center;*/
   display: grid;
   justify-content: center;
   align-items: center;
   align-content: center;
   grid-template-columns: auto;
   grid-template-rows: auto auto;
   grid-row-gap: 4em;
   grid-template-areas:
      'message'
      'spinner';
   width: 100%;
   height: 100%;

}
.v-loading-page > .-content > .-message{
   grid-area: message;
}
.v-loading-page > .-content > .-spinner-container{
   grid-area: spinner;
}

.v-loading-page > .-content > .-message{
   font-family: 'Roboto', sans-serif;
   font-weight: 500;
   color: var(--blank-fg--base);
   font-size: 1.4em;
   text-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.v-loading-page > .-content > .-spinner-container{
   display: flex;
   justify-content: center;
}
.v-loading-page > .-content > .-spinner-container > .-spinner .md-progress-spinner{
   --md-theme-default-primary: var(--accent-bg--base);
}
</style>
