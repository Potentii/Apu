<template>
   <div class="new-connection-view">
      <h1 class="-view-section-title">New connection</h1>
      <form class="-create-connection-form" ref="form" v-id @submit.prevent="createForm_onSubmit">

         <label class="-label">Name</label>
         <input class="-input -corr-id" type="text" v-model="form.name" required/>

         <label class="-label">Description</label>
         <input class="-input -corr-id" type="text" v-model="form.description"/>

         <label class="-label">Host</label>
         <input class="-input -corr-id" type="text" v-model="form.host" required/>

         <label class="-label">Port</label>
         <input class="-input -corr-id" type="text" v-model="form.port" required/>

         <label class="-label">Queue Manager</label>
         <input class="-input -corr-id" type="text" v-model="form.queue_manager" required/>

         <label class="-label">Channel</label>
         <input class="-input -corr-id" type="text" v-model="form.channel"/>

         <label class="-label">Username</label>
         <input class="-input -corr-id" type="text" v-model="form.username"/>

         <label class="-label">Password</label>
         <input class="-input -corr-id" type="text" v-model="form.password"/>

      </form>

      <ul class="fab-list">
         <button class="fab --raised" :form="$refs.form ? $refs.form.id : null"><i class="material-icons">done</i></button>
      </ul>
   </div>
</template>



<script>
import { mapGetters, mapMutations } from 'vuex'
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
            this.form.channel);

         connection_storage.add(new_connection);
      }
   }

}
</script>



<style>

.new-connection-view{
   --fab-background-color: #d23;
   --fab-foreground-color: #FAFAFA;
}

.new-connection-view > .-create-connection-form{
   display: flex;
   flex-direction: column;
   padding: 1rem var(--h-padding) 4rem var(--h-padding);
}

.new-connection-view > .-create-connection-form > .-label{
   font-size: 0.9em;
   color: var(--m-grey-700);
   margin-bottom: 0.6em;
}

.new-connection-view > .-create-connection-form > .-input{
   font-size: 0.8em;
   padding: 0.6em 1em;
   background-color: var(--m-grey-50);
   border-radius: 2px;
   margin-bottom: 2em;
   box-shadow: 0 3px 2px -1px rgba(0, 0, 0, 0.06);

   transition: box-shadow 0.2s ease;
} .new-connection-view > .-create-connection-form > .-input:hover{
   box-shadow: 0 4px 3px -1px rgba(0, 0, 0, 0.2);
} .new-connection-view > .-create-connection-form > .-input:focus{
   box-shadow: 0 3px 2px -1px rgba(0, 0, 0, 0.13);
}

.new-connection-view > .-create-connection-form > .-input.-message{
   white-space: nowrap;
   resize: vertical;
   min-height: 10em;
   height: 25em;
}
.new-connection-view > .-create-connection-form > .-input.-corr-id,
.new-connection-view > .-create-connection-form > .-input.-message{
   font-family: 'Roboto Mono';
}
</style>
