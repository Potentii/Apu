<template>
   <div class="v-connection-creator-view">
<!--      <h1 class="-view-section-title">New connection</h1>-->

      <!-- * Section header * -->
      <v-apu-section-header class="-header" title_class="-header-title" content_class="-header-content" no_separator>

         <!-- * Title * -->
         <span class="-title" slot="title">
               <span class="-name">New connection</span>
            </span>

      </v-apu-section-header>


      <!-- * Content * -->
      <v-faded-viewport class="-main" content_class="-main-content">

         <form class="-create-connection-form" ref="form" v-id @submit.prevent="_onSubmit">

            <div class="field -name --required">
               <label class="-label">Name</label>
               <input class="-input" type="text" v-model="form.name" placeholder="Dev, production environment, etc" title="A name that identifies this connection" required autofocus/>
            </div>
            <div class="field -description">
               <label class="-label">Description</label>
               <input class="-input" type="text" v-model="form.description"/>
            </div>
            <div class="field -host --required">
               <label class="-label">Host</label>
               <input class="-input" type="text" v-model="form.host" placeholder="The IP address of the MQ server" required/>
            </div>
            <div class="field -port --required">
               <label class="-label">Port</label>
               <input class="-input" type="text" v-model="form.port" placeholder="The IP address port" required/>
            </div>
            <div class="field -queue-manager --required">
               <label class="-label">Queue manager</label>
               <input class="-input" type="text" v-model="form.queue_manager" required/>
            </div>
            <div class="field -channel">
               <label class="-label">Channel</label>
               <input class="-input" type="text" v-model="form.channel"/>
            </div>
            <div class="field -username">
               <label class="-label">Username</label>
               <input class="-input" type="text" v-model="form.username"/>
            </div>
            <div class="field -password">
               <label class="-label">Password</label>
               <input class="-input" type="text" v-model="form.password"/>
            </div>

            <div class="-action">
               <!-- <button type="submit"><i class="material-icons">swap_horiz</i><span>Test connection</span></button> -->
               <!-- <button type="submit"><i class="material-icons">done</i></button> -->
            </div>

         </form>

      </v-faded-viewport>


      <!-- * FABs * -->
      <v-fab-group>

         <template slot="main">
            <!-- * Create connection * -->
            <v-fab-button class="-create-connection"
                          type="submit"
                          @click="action='CREATE-CONNECTION'"
                          :disabled="testing"
                          title="Create connection"
                          :form="$refs.form ? $refs.form.id : null">
               <i class="material-icons">done</i>
            </v-fab-button>
         </template>

      </v-fab-group>
<!--      -->
<!--      <ul class="fab-list">-->
<!--         <button class="fab &#45;&#45;raised"-->
<!--            @click="action='CREATE-CONNECTION'"-->
<!--            :disabled="testing"-->
<!--            title="Create connection"-->
<!--            :form="$refs.form ? $refs.form.id : null">-->
<!--            <i class="material-icons">done</i>-->
<!--         </button>-->
<!--         &lt;!&ndash; <button class="fab &#45;&#45;raised"-->
<!--            @click="action='TEST-CONNECTION'"-->
<!--            :disabled="testing"-->
<!--            title="Test connection"-->
<!--            :form="$refs.form ? $refs.form.id : null">-->
<!--            <i class="material-icons" v-if="!testing">swap_horiz</i>-->
<!--            <md-progress-spinner v-else md-mode="indeterminate" md-diameter="22" md-stroke="3"/>-->
<!--         </button> &ndash;&gt;-->
<!--      </ul>-->
   </div>
</template>



<script>
import { mapGetters, mapActions } from 'vuex'
import UIMessage                  from '/app/ui-messages/ui-message'
import Connection                 from '../connection.esm'
import SavedConnection            from '../saved-connection'
import VApuSectionHeader          from '../../../infra/ui/v-apu-section-header';
import VFadedViewport             from '../../../infra/ui/v-faded-viewport';
import VFabButton                 from '../../../infra/ui/v-fab-button';
import VFabGroup                  from '../../../infra/ui/v-fab-group';

export default {

   name: 'v-connection-creator-view',
	components: { VFabGroup, VFabButton, VFadedViewport, VApuSectionHeader },
	data(){
      return {
         action: null,
         testing: false,
         form: {
            name: '',
            description: '',
            host: '',
            port: '',
            queue_manager: '',
            channel: '',
            username: '',
            password: ''
         }
      };
   },


   computed: {
      ...mapGetters('connection', [ 'getSavedConnectionByName' ])
   },


   beforeMount(){
      this.clearForm();
   },


   methods: {
      ...mapActions('connection', [ 'createNewSavedConnection' ]),
      ...mapActions('ui-messages', [ 'addMessage' ]),


      clearForm(){
         this.form.name          = '';
         this.form.description   = '';
         this.form.host          = '';
         this.form.port          = '';
         this.form.queue_manager = '';
         this.form.channel       = '';
         this.form.username      = '';
         this.form.password      = '';
      },


      // _validate(){
      //    if(this.getSavedConnectionByName(this.form.name)){
      //       this.addMessage(new UIMessage(
      //          UIMessage.SEVERITY.ERROR,
      //          `Another connection "${this.form.name}" already exists`,
      //          `Please, choose a new connection name`));
      //       return false;
      //    }
      //    return true;
      // },

      _buildSavedConnectionUsingFields(){
         const connection_data = new Connection(
               this.form.host,
               this.form.port,
               this.form.queue_manager,
               this.form.channel  || null,
               this.form.username || null,
               this.form.password || null
            );
         const saved_connection = new SavedConnection(
               this.form.name,
               connection_data
            );

         return saved_connection;
      },



      _onSubmit(e){
         switch(this.action){
            case 'CREATE-CONNECTION': {
               if(this.getSavedConnectionByName(this.form.name)){
                  this.addMessage(new UIMessage(
                     UIMessage.SEVERITY.ERROR,
                     `Another connection "${this.form.name}" already exists`,
                     `Please, choose a new connection name`));
                  return false;
               }

               // *Creating a new connection, based on the user typed data:
               const new_saved_connection = this._buildSavedConnectionUsingFields();

               // *Saving the new connection on cache and applying it to the application state:
               this.createNewSavedConnection(new_saved_connection);

               // *Cleaning the data typed in the form:
               this.clearForm();

               this.$router.push({ name: 'connections' });
               break;
            }
            case 'TEST-CONNECTION': {
               this.testing = true;

               // *Creating a new connection, based on the user typed data:
               const saved_connection = this._buildSavedConnectionUsingFields();

               // TODO check if the connection really works

               this.addMessage(new UIMessage(
                  UIMessage.SEVERITY.WARNING,
                  `This feature hasn't been implemented yet`));

               this.testing = false;

               // this.addMessage(new UIMessage(
               //    UIMessage.SEVERITY.SUCCESS,
               //    `Connection is working!`));
               break;
            }

            default:
               this.addMessage(new UIMessage(
                  UIMessage.SEVERITY.ERROR,
                  `Error: invalid action called`));
         }

      }

   }

}
</script>



<style>
.v-connection-creator-view{
   display: flex;
   flex-direction: column;
   height: 100%;
}


/**
 * Header
 */
.v-connection-creator-view > .-header{
   position: absolute;
   z-index: 4;
}

.v-connection-creator-view > .-header .-header-title > .-title{
   cursor: default;
}
.v-connection-creator-view > .-header .-header-title > .-title > .-name{
   font-size: 1.2em;
}



.v-connection-creator-view > .-main{
   flex-grow: 1;
   height: 100%;
}
.v-connection-creator-view > .-main .-main-content{
   display: flex;
   flex-direction: column;

   padding-top: 4.5rem;
   padding-bottom: 5rem;

   overflow: auto;
}



.v-connection-creator-view > .-main .-main-content > .-create-connection-form{
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-column-gap: 1em;
   grid-row-gap: 2em;
   grid-template-areas:
      'name        name'
      'description description'
      'host        port'
      'manager     channel'
      'username    password';

   padding: 0 var(--h-padding);
}
.v-connection-creator-view > .-main .-main-content > .-create-connection-form > .field.-name{
   grid-area: name;
}
.v-connection-creator-view > .-main .-main-content > .-create-connection-form > .field.-description{
   grid-area: description;
}
.v-connection-creator-view > .-main .-main-content > .-create-connection-form > .field.-host{
   grid-area: host;
}
.v-connection-creator-view > .-main .-main-content > .-create-connection-form > .field.-port{
   grid-area: port;
}
.v-connection-creator-view > .-main .-main-content > .-create-connection-form > .field.-queue-manager{
   grid-area: manager;
}
.v-connection-creator-view > .-main .-main-content > .-create-connection-form > .field.-channel{
   grid-area: channel;
}
.v-connection-creator-view > .-main .-main-content > .-create-connection-form > .field.-username{
   grid-area: username;
}
.v-connection-creator-view > .-main .-main-content > .-create-connection-form > .field.-password{
   grid-area: password;
}
</style>
