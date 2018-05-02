<template>
   <div class="list-connections-view">
      <ul class="-list">
         <router-link tag="li" :to="'/index/connections/' + saved_conn.name + '/queues'" class="-item" v-for="saved_conn in getSavedConnections()">
            <span class="-location">
               <span class="-manager">{{ saved_conn.conn.queue_manager }}</span>
               <span class="-on"> on </span>
               <span class="-url">{{ saved_conn.conn.host }}:{{ saved_conn.conn.port }}</span>
            </span>
            <span class="-name">{{ saved_conn.name }}</span>
         </router-link>
      </ul>
   </div>
</template>



<script>
import { mapGetters, mapMutations } from 'vuex'
import SavedConnection from '../repository/types/saved-connection'

export default {

   name: 'list-connections-view',

   data(){
      return {};
   },

   computed: {
      ...mapGetters([
         'getSavedConnections'
      ])
   },

   mounted(){
      this.load();
   },

   methods: {
      ...mapMutations([
         'setSelectedConnection',
         'clearSavedConnection',
         'addSavedConnection'
      ]),

      loadSavedConnections(){
         this.clearSavedConnection();

         [
            new SavedConnection('conn1', { host: '127.1.1.0', port: 1234, queue_manager: 'abc', channel: '' }),
            new SavedConnection('conn2', { host: '127.1.1.0', port: 1234, queue_manager: 'abc', channel: '' }),
            new SavedConnection('conn3', { host: '127.1.1.0', port: 1234, queue_manager: 'abc', channel: '' }),
            new SavedConnection('conn4', { host: '127.1.1.0', port: 1234, queue_manager: 'abc', channel: '' })
         ].forEach(c => this.addSavedConnection(c));
      },

      load(){
         this.setSelectedConnection(null);
         this.loadSavedConnections();
      }
   }

}
</script>



<style>
.list-connections-view > .-list > .-item{
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: 1fr 1fr;
   grid-template-areas:
      'location'
      'name';

   padding: 0.5em 1em;
}
.list-connections-view > .-list > .-item::after{
   content: '';
   postion: absolute;
   width: 100%;
   height: 1px;
   bottom: 0;
   left: 0;
   background-color: rgba(0,0,0,0.1);
}
.list-connections-view > .-list > .-item > .-location{
   grid-area: location;
}
.list-connections-view > .-list > .-item > .-name{
   grid-area: name;
}


.list-connections-view > .-list > .-item > .-name{
   font-size: 1.2em;
   font-weight: bold;
}
</style>
