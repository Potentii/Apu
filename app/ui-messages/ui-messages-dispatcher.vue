<template>
   <ul class="ui-messages-dispatcher">
      <li class="-message" :data-severity="message.severity" v-for="message in messages">

         <span class="-content">{{ message.content }}</span>

         <span class="-description">{{ message.description }}</span>

         <button
            class="-dismiss-btn material-icons"
            v-if="message.hasAction(message.constructor.ACTION.DISMISS)"
            type="button"
            @click="_dismissBtn_onClick($event, message)">
            close
         </button>

         <button
            class="-undo-btn material-icons"
            v-if="message.hasAction(message.constructor.ACTION.UNDO)"
            type="button"
            @click="_undoBtn_onClick($event, message)">
            undo
         </button>
      </li>
   </ul>
</template>


<script>
import { mapState } from 'vuex'
import UIMessage from './ui-message'

export default {

   name: 'ui-messages-dispatcher',

   computed: {
      ...mapState('ui-messages', [ 'messages' ])
   },

   methods: {
      _dismissBtn_onClick(e, message){
         message.emit(UIMessage.ACTION.DISMISS);
      },

      _undoBtn_onClick(e, message){
         message.emit(UIMessage.ACTION.UNDO);
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

   grid-template-columns: auto 1fr auto auto;
   grid-template-rows: auto auto;
   grid-template-areas:
      'content     ... undo dismiss'
      'description ... undo dismiss';

   padding: 1em 1.5em;
   margin-top: 0.8em;

   border-radius: 7px;
   color: var(--m-grey-50);
   background-color: var(--m-grey-800);

   box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.3);

   overflow: hidden;

   animation-name: ui-message-fade;
   animation-duration: 0.1s;
   animation-timing-function: ease;
}
.ui-messages-dispatcher > .-message::before{
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   width: 8px;
   height: 100%;
} .ui-messages-dispatcher > .-message[data-severity="SUCCESS"]::before{
   background-color: var(--m-light-green-a400);
} .ui-messages-dispatcher > .-message[data-severity="INFO"]::before{
   background-color: var(--m-blue-600);
} .ui-messages-dispatcher > .-message[data-severity="WARNING"]::before{
   background-color: var(--m-yellow-700);
} .ui-messages-dispatcher > .-message[data-severity="ERROR"]::before{
   background-color: var(--m-red-800);
}
.ui-messages-dispatcher > .-message > .-content{
   grid-area: content;
}
.ui-messages-dispatcher > .-message > .-description{
   grid-area: description;
}
.ui-messages-dispatcher > .-message > .-dismiss-btn{
   grid-area: dismiss;
}
.ui-messages-dispatcher > .-message > .-undo-btn{
   grid-area: undo;
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
   cursor: default;
   font-size: 1em;
   letter-spacing: 0.02em;
}
.ui-messages-dispatcher > .-message > .-description{
   cursor: default;
   opacity: 0.7;
   margin-top: 0.5em;
   font-size: 0.8em;
   letter-spacing: 0.02em;
}
.ui-messages-dispatcher > .-message > .-dismiss-btn,
.ui-messages-dispatcher > .-message > .-undo-btn{
   opacity: 0.6;
   color: var(--m-grey-50);
   user-select: none;
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
