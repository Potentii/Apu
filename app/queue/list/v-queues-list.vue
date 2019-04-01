<template>
   <ul class="v-queues-list">
      <div class="-title" v-if="name && !!name.trim().length">
         <span class="-name">{{ name }}</span>
         <span class="-count">({{ queues.length + (queues.length===1?' queue':' queues') }})</span>
      </div>
      <router-link
         class="-item"
         :key="queue.id"
         tag="li"
         :to="'/index/connections/' + queue.connection_id + '/queues/' + queue._id + '/messages/send'"
         v-for="queue in queues">
         <div class="-container">
            <span class="-name">{{ queue.name }}</span>
            <span class="-last-use" v-if="!!queue.last_use">{{ getLastUseText(queue.last_use) }}</span>
            <i class="-starred material-icons" v-if="!!queue.starred">star</i>
            <i class="-chevron material-icons">chevron_right</i>
         </div>
      </router-link>
   </ul>
</template>



<script>
export default {

   name: 'v-queues-list',

   props: {
		/**
       * @type {QueueVO[]}
		 */
		'queues': {
         type: Array,
         required: true
      },

		'name': {
			type: String,
			required: false
		}
   },


   methods: {
   	getLastUseText(last_used_ms){
   		const now = Date.now();
			const seconds = Math.floor((now - last_used_ms)/1000);
			let interval;

			interval = Math.floor(seconds / 2592000);
			if(interval >= 1)
				return '>1 month ago';

			interval = Math.floor(seconds / 86400);
			if(interval >= 1)
				return interval + ' ' + (interval>1?'days':'day') + ' ago';

			interval = Math.floor(seconds / 3600);
			if(interval >= 1)
				return interval + ' ' + (interval>1?'hours':'hour') + ' ago';

			interval = Math.floor(seconds / 2700);
			if(interval >= 1)
				return '~45min ago';

			interval = Math.floor(seconds / 1800);
			if(interval >= 1)
				return '~30min ago';

			interval = Math.floor(seconds / 900);
			if(interval >= 1)
				return '~15min ago';

			interval = Math.floor(seconds / 600);
			if(interval >= 1)
				return '~10min ago';

         return '<5min ago';
      }
   }

}
</script>



<style>
.v-queues-list{
   --v-queues-list--padding-v: 0.8em;
   --v-queues-list--padding-h: 1em;
   border-radius: 6px;
   overflow: hidden;
   background-color: var(--m-grey-50);
   margin: 0 var(--h-padding) 1em var(--h-padding);
   box-shadow: 0 3px 8px -1px rgba(0, 0, 0, 0.1);
}


.v-queues-list > .-title{
   cursor: default;
   user-select: none;
   display: flex;
   flex-direction: row;
   align-items: center;
   padding: var(--v-queues-list--padding-v) var(--v-queues-list--padding-h);
}
.v-queues-list > .-title > .-name{
   display: inline-block;
   margin-right: 0.5em;
   font-family: 'Roboto', sans-serif;
   font-weight: 500;
   font-size: 16px;
}
.v-queues-list > .-title > .-count{
   opacity: 0;
   color: var(--m-grey-600);
   font-family: 'Roboto', sans-serif;
   font-size: 11px;
   transform: translateX(-0.5em);
   transition: opacity, transform, 0.2s ease;
} .v-queues-list:hover > .-title > .-count{
   opacity: 1;
   transform: translateX(0);
}




/**
 * Items
 */
.v-queues-list > .-item{
   padding: var(--v-queues-list--padding-v) var(--v-queues-list--padding-h);
   transition: background-color 0.2s ease;
} .v-queues-list > .-item:hover{
   cursor: pointer;
   background-color: var(--m-grey-100);
}
/**
 * Item separator
 */
.v-queues-list > .-item + .-item::after{
   content: '';
   position: absolute;
   width: 100%;
   height: 1px;
   top: 0;
   left: 0;
   background-color: var(--m-grey-200);
   transition: opacity 0.2s ease;
}


.v-queues-list > .-item > .-container{
   display: grid;
   grid-column-gap: 0.2em;
   grid-template-columns: auto 1fr auto;
   grid-template-areas:
      'name ... last-use starred chevron';
   align-items: center;
}
.v-queues-list > .-item > .-container > .-name{
   grid-area: name;
}
.v-queues-list > .-item > .-container > .-last-use{
   grid-area: last-use;
}
.v-queues-list > .-item > .-container > .-starred{
   grid-area: starred;
}
.v-queues-list > .-item > .-container > .-chevron{
   grid-area: chevron;
}


/**
 * Queue name
 */
.v-queues-list > .-item > .-container > .-name{
   font-size: 1em;
   text-transform: uppercase;
}
.v-queues-list > .-item > .-container > .-last-use{
   font-size: 0.9em;
   color: var(--m-grey-500);
}
.v-queues-list > .-item > .-container > .-chevron{
   user-select: none;
   opacity: 0;
   color: var(--m-grey-700);
   transform: translateX(-0.5em);
   transition: opacity, transform, 0.2s ease;
} .v-queues-list > .-item:hover > .-container > .-chevron{
   opacity: 0.5;
   transform: translateX(0);
}
</style>
