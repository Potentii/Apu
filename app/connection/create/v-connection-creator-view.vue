<template>
   <div class="v-connection-creator-view">
      <h1 class="-view-section-title">New connection</h1>
      <form class="-create-connection-form" ref="form" v-id @submit.prevent="_onSubmit">

         <div class="field">
            <label class="-label">Name</label>
            <input class="-input -corr-id" type="text" v-model="form.name" required/>
         </div>
         <div class="field">
            <label class="-label">Description</label>
            <input class="-input -corr-id" type="text" v-model="form.description"/>
         </div>
         <div class="field">
            <label class="-label">Host</label>
            <input class="-input -corr-id" type="text" v-model="form.host" required/>
         </div>
         <div class="field">
            <label class="-label">Port</label>
            <input class="-input -corr-id" type="text" v-model="form.port" required/>
         </div>
         <div class="field">
            <label class="-label">Queue Manager</label>
            <input class="-input -corr-id" type="text" v-model="form.queue_manager" required/>
         </div>
         <div class="field">
            <label class="-label">Channel</label>
            <input class="-input -corr-id" type="text" v-model="form.channel"/>
         </div>
         <div class="field">
            <label class="-label">Username</label>
            <input class="-input -corr-id" type="text" v-model="form.username"/>
         </div>
         <div class="field">
            <label class="-label">Password</label>
            <input class="-input -corr-id" type="text" v-model="form.password"/>
         </div>

      </form>

      <ul class="fab-list">
         <button class="fab --raised" :form="$refs.form ? $refs.form.id : null">
            <i class="material-icons">done</i>
         </button>
      </ul>
   </div>
</template>



<script>
import { mapGetters, mapActions } from 'vuex'
import UIMessage from '/app/ui-messages/ui-message'
import Connection from '../connection.esm'
import SavedConnection from '../saved-connection'

export default {

   name: 'v-connection-creator-view',


   data(){
      return {
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


      _onSubmit(e){
         if(this.getSavedConnectionByName(this.form.name)){
            this.addMessage(new UIMessage(
               UIMessage.SEVERITY.ERROR,
               `Another connection "${this.form.name}" already exists`,
               `Please, choose a new name for this connection`));
            return;
         }

         // *Creating a new connection, based on the user typed data:
         const new_connection_data = new Connection(
               this.form.host,
               this.form.port,
               this.form.queue_manager,
               this.form.channel  || null,
               this.form.username || null,
               this.form.password || null
            );
         const new_saved_connection = new SavedConnection(
               this.form.name,
               new_connection_data
            );

         // *Saving the new connection on cache and applying it to the application state:
         this.createNewSavedConnection(new_saved_connection);

         // *Cleaning the data typed in the form:
         this.clearForm();
      }

   }

}
</script>



<style>
.v-connection-creator-view > .-create-connection-form{
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-column-gap: 1em;
   grid-row-gap: 2em;
   grid-template-areas:
      'name     description'
      'host     port'
      'manager  channel'
      'username password';
   padding: 1rem var(--h-padding) 4rem var(--h-padding);
}
@media (max-width: 500px) {
   .v-connection-creator-view > .-create-connection-form{
      grid-template-columns: 1fr;
      grid-template-areas: unset;
   }
}
.v-connection-creator-view > .-create-connection-form > .field.-name{
   grid-area: name;
}
.v-connection-creator-view > .-create-connection-form > .field.-description{
   grid-area: description;
}
.v-connection-creator-view > .-create-connection-form > .field.-host{
   grid-area: host;
}
.v-connection-creator-view > .-create-connection-form > .field.-port{
   grid-area: port;
}
.v-connection-creator-view > .-create-connection-form > .field.-queue-manager{
   grid-area: manager;
}
.v-connection-creator-view > .-create-connection-form > .field.-channel{
   grid-area: channel;
}
.v-connection-creator-view > .-create-connection-form > .field.-username{
   grid-area: username;
}
.v-connection-creator-view > .-create-connection-form > .field.-password{
   grid-area: password;
}
</style>
