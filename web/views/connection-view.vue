<template>
   <div class="connection-view">
      
      <router-link
         class="-item"
         tag="button"
         :to="'/index/connections/' + $route.params.conn_name + '/edit'">
         Edit
      </router-link>

      <!-- TODO queues list -->
   </div>
</template>



<script>
import { mapGetters, mapMutations } from 'vuex'

export default {

   name: 'connection-view',

   data(){
      return {
         conn: null
      };
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
         'setSelectedConnection'
      ]),

      load(){
         // *Getting the connection name from the navigation parameter:
         const conn_name = this.$route.params.conn_name;
         // *Checking if the informed connection name represent a known connection:
         if(!this.getSavedConnections().some(c => c.name === conn_name))
            // *If it doesn't:
            // *Sending the user back to the connections selection page:
            this.$router.replace({ path: '/connections', params: { error: new Error(`Connection "${conn_name}" not found`) } });
      }
   }

}
</script>



<style>
.list-queues-view > * {
   padding-left: 1rem;
   padding-right: 1rem;
}
.list-queues-view > .-title{
   font-size: 1.4em;
   font-weight: normal;
}
.list-queues-view > .-title > .-conn-name{
   font-weight: bold;
   font-family: 'Roboto Medium';
}

.list-queues-view > .-list > .-item{
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: 1fr 1fr;
   grid-template-areas:
      'location'
      'name';

   padding: 0.5em 1em;
}
.list-queues-view > .-list > .-item::after{
   content: '';
   postion: absolute;
   width: 100%;
   height: 1px;
   bottom: 0;
   left: 0;
   background-color: rgba(0,0,0,0.1);
}
.list-queues-view > .-list > .-item > .-location{
   grid-area: location;
}
.list-queues-view > .-list > .-item > .-name{
   grid-area: name;
}


.list-queues-view > .-list > .-item > .-name{
   font-size: 1.2em;
   font-weight: bold;
}
</style>
