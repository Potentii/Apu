<template>
   <div class="v-connections-import-item" :class="{ '--selected': selection.is_selected }">

      <div class="-heading">
         <button class="-expand material-icons" type="button" @click="show_details=!show_details">{{ show_details ? 'expand_less' : 'expand_more' }}</button>
         <span class="-name" @click="show_details=!show_details">{{ selection.data.name }}</span>
         <md-checkbox v-model="selection.is_selected" class="-check"></md-checkbox>
      </div>

      <transition name="--details" :duration="{ enter: 250, leave: 350 }">
         <div class="-details" v-if="show_details">

            <span class="-host -detail" v-if="selection.data.data.host">
               <span class="-label">Host</span>
               <span class="-value">{{ selection.data.data.host }}:{{ selection.data.data.port }}</span>
            </span>


            <span class="-queue-manager -detail" v-if="selection.data.data.queue_manager">
               <span class="-label">Queue Manager</span>
               <span class="-value">{{ selection.data.data.queue_manager }}</span>
            </span>


            <span class="-channel -detail" v-if="selection.data.data.channel">
               <span class="-label">Channel</span>
               <span class="-value">{{ selection.data.data.channel }}</span>
            </span>


            <span class="-username -detail" v-if="selection.data.data.username">
               <span class="-label">Username</span>
               <span class="-value">{{ selection.data.data.username }}</span>
            </span>


            <span class="-password -detail" v-if="selection.data.data.password">
               <span class="-label">Password</span>
               <span class="-value">{{ selection.data.data.password ? '*****' : '-----' }}</span>
            </span>

         </div>
      </transition>

   </div>
</template>



<script>
import ImportSelection from './import-selection';



export default {

   name: 'v-connections-import-item',


	props: {
		/**
       * The connections to be imported
       * @type {ImportSelection}
		 */
		'selection': {
   		type: ImportSelection,
         required: true
      }
   },


   data(){
   	return {
   		show_details: false
      };
   }

}
</script>



<style>
.v-connections-import-item{
   display: flex;
   flex-direction: column;
   align-items: stretch;
}

.v-connections-import-item > .-heading{
   display: grid;
   grid-template-columns: auto auto 1fr auto auto;
   grid-template-rows: auto;
   grid-template-areas:
      'expand name ... check';
   grid-column-gap: 0.8em;
   align-items: center;

   background-color: var(--m-grey-100);
   padding: 1em;
   border-radius: 8px;
   box-shadow: 0 3px 8px -2px rgba(0,0,0,0.1);
   z-index: 2;
}
.v-connections-import-item > .-heading > .-expand{
   grid-area: expand;
}
.v-connections-import-item > .-heading > .-name{
   grid-area: name;
}
.v-connections-import-item > .-heading > .-check{
   grid-area: check;
}


.v-connections-import-item > .-heading > .-name{
   cursor: pointer;
   font-size: 16px;
}
.v-connections-import-item:not(.--selected) > .-heading > .-expand,
.v-connections-import-item:not(.--selected) > .-heading > .-name,
.v-connections-import-item:not(.--selected) > .-heading > .-overwrite{
   opacity: 0.5;
}

.v-connections-import-item > .-heading > .-check.md-checkbox{
   --md-theme-default-accent: var(--m-green-a400);
   margin: 0;
}

.v-connections-import-item > .-details{
   display: grid;
   grid-template-columns: auto auto 1fr auto auto;
   grid-template-rows: auto;
   grid-template-areas:
      'host host'
      'queue-manager channel'
      'username password';
   grid-column-gap: 0.8em;
   grid-row-gap: 0.5em;
   align-items: center;

   background-color: var(--m-grey-100);
   padding: 1em;
   border-bottom-left-radius: 8px;
   border-bottom-right-radius: 8px;
   box-shadow: 0 3px 8px -2px rgba(0,0,0,0.1);
   z-index: 1;
}
.v-connections-import-item > .-details > .-host{
   grid-area: host;
}
.v-connections-import-item > .-details > .-queue-manager{
   grid-area: queue-manager;
}
.v-connections-import-item > .-details > .-channel{
   grid-area: channel;
}
.v-connections-import-item > .-details > .-username{
   grid-area: username;
}
.v-connections-import-item > .-details > .-password{
   grid-area: password;
}

.v-connections-import-item > .-details.--details-enter-active{
   animation-name: v-connections-import-item-details-in;
   animation-duration: 0.2s;
   animation-timing-function: ease;
   animation-fill-mode: both;
}
.v-connections-import-item > .-details.--details-leave-active{
   animation-name: v-connections-import-item-details-out;
   animation-duration: 0.2s;
   animation-delay: 0.1s;
   animation-timing-function: ease-in;
   animation-fill-mode: both;
}

@keyframes v-connections-import-item-details-in{
   0%{
      opacity: 0;
      transform: translateY(-50%);
   }
}
@keyframes v-connections-import-item-details-out{
   100%{
      opacity: 0;
      transform: translateY(-50%);
   }
}



.v-connections-import-item > .-details > .-detail{
   display: flex;
   flex-direction: column;
   align-items: stretch;
}
.v-connections-import-item:not(.--selected) > .-details > .-detail{
   opacity: 0.5;
}
.v-connections-import-item > .-details > .-detail > .-label{
   cursor: default;
   user-select: none;
   font-size: 11px;
   color: var(--m-grey-500);
   margin-bottom: -0.3em;
}
.v-connections-import-item > .-details > .-detail > .-value{
   font-size: 14px;
   color: var(--m-grey-900);
}


</style>
