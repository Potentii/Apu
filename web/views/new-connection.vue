<template>
   <div class="new-connection-view">
      <h1 class="-view-section-title">New connection</h1>
      <form class="-create-connection-form" ref="form" v-id @submit.prevent="createForm_onSubmit">

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
import Connection from '../types/connection'
import * as connection_storage from '../storage/connections'

export default {

   name: 'new-connection-view',

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
      ...mapGetters([
         'getSavedConnection',
         'getSavedConnections'
      ])
   },

   beforeMount(){
      this.load();
   },

   methods: {
      ...mapActions([
         'createNewConnection'
      ]),

      clearForm(){
         this.form.name = '';
         this.form.description = '';
         this.form.host = '';
         this.form.port = '';
         this.form.queue_manager = '';
         this.form.channel = '';
         this.form.username = '';
         this.form.password = '';
      },

      load(){
         this.clearForm();
      },

      createForm_onSubmit(e){
         const new_connection = new Connection(this.form.name,
            this.form.host,
            this.form.port,
            this.form.queue_manager,
            this.form.channel || null);

         this.createNewConnection(new_connection);

         this.$emit('message', 'Connection added');

         this.$router.push({ name: 'connections' });
      }
   }

}
</script>



<style>
.new-connection-view > .-create-connection-form{
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
   .new-connection-view > .-create-connection-form{
      grid-template-columns: 1fr;
      grid-template-areas: unset;
   }
}
.new-connection-view > .-create-connection-form > .field.-name{
   grid-area: name;
}
.new-connection-view > .-create-connection-form > .field.-description{
   grid-area: description;
}
.new-connection-view > .-create-connection-form > .field.-host{
   grid-area: host;
}
.new-connection-view > .-create-connection-form > .field.-port{
   grid-area: port;
}
.new-connection-view > .-create-connection-form > .field.-queue-manager{
   grid-area: manager;
}
.new-connection-view > .-create-connection-form > .field.-channel{
   grid-area: channel;
}
.new-connection-view > .-create-connection-form > .field.-username{
   grid-area: username;
}
.new-connection-view > .-create-connection-form > .field.-password{
   grid-area: password;
}
</style>
