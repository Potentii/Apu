<template>
   <ul class="ui-messages-dispatcher">
      <li class="-message" :data-severity="message.severity" v-for="message in _getMessages()">
         <span class="-content">{{ message.content }}</span>
         <button class="-close-btn material-icons"
            type="button"
            @click="_closeBtn_onClick($event, message)">
            close
         </button>
      </li>
   </ul>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
   name: 'ui-messages-dispatcher',

   computed: {
      ...mapGetters('ui-messages', [
         '_getMessages'
      ])
   },

   methods: {
      ...mapMutations('ui-messages', [
         '_removeMessage'
      ]),

      _closeBtn_onClick(e, message){
         this._removeMessage(message);
      }
   }
}
</script>


<style>
.ui-messages-dispatcher{
   position: fixed;
   display: flex;
   flex-direction: column-reverse;

   bottom: 1em;
   left: 1em;

   width: 25rem;
   max-width: 25rem;
}
.ui-messages-dispatcher > .-message{
   display: grid;
   align-items: center;

   grid-template-columns: auto 1fr auto;
   grid-template-areas:
      'content ... close';

   padding: 1em 1em;
   margin-top: 0.8em;
   border-radius: 3px;
   color: var(--m-grey-50);
   background-color: var(--m-grey-800);

   box-shadow: 0 3px 2px -1px rgba(0, 0, 0, 0.1);

   animation-name: ui-message-fade;
   animation-duration: 0.1s;
   animation-timing-function: ease;
} .ui-messages-dispatcher > .-message[data-severity="ERROR"]{
   color: var(--m-grey-50);
   background-color: var(--m-red-800);
} .ui-messages-dispatcher > .-message[data-severity="WARNING"]{
   color: var(--m-grey-900);
   background-color: var(--m-yellow-700);
}

@media (max-width: 600px){
   .ui-messages-dispatcher{
      bottom: 0;
      left: 0;

      width: 100vw;
      max-width: 100vw;
   }
   .ui-messages-dispatcher > .-message{
      margin-top: 0;
      border-radius: 0;
      box-shadow: none;
   }
}

.ui-messages-dispatcher > .-message > .-content{
   grid-area: content;
   cursor: default;
   font-size: 0.9em;
}
.ui-messages-dispatcher > .-message > .-close-btn{
   grid-area: close;
   opacity: 0.6;
   color: var(--m-grey-50);
}

@keyframes ui-message-fade {
   0%{
      opacity: 0.3;
      transform: translateY(100%) scale(0.9);
   }
   100%{
      opacity: 1;
      transform: translateY(0) scale(1);
   }
}
</style>
