<template>
   <ul class="ui-messages-dispatcher">
      <li class="-message" :key="message.id" :data-severity="message.severity" v-for="message in messages">

         <div class="-content">
            <span class="-title">{{ message.title }}</span>
            <span class="-description" v-if="message.description">{{ message.description }}</span>
         </div>

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
   /*bottom: 0;*/
   /*left: 0;*/
   /*width: 100vw;*/
   width: 30rem;
   max-width: 100%;
}
.ui-messages-dispatcher > .-message{
   --strip-width: 6px;
   display: grid;
   align-items: center;
   grid-template-columns: auto minmax(3em, 1fr) auto auto;
   grid-template-areas:
      'content ... undo dismiss';

   padding: 1.4em 1.5em;
   margin-top: 0.8em;

   border-radius: var(--strip-width);
   color: var(--m-grey-800);
   background-color: var(--m-grey-50);

   box-shadow: 0 3px 20px -2px rgba(0, 0, 0, 0.2);

   overflow: hidden;

   animation-name: ui-message-fade;
   animation-duration: 0.1s;
   animation-timing-function: ease;
}
.ui-messages-dispatcher > .-message::before{
   --strip-color: var(--m-grey-500);
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   width: calc(var(--strip-width) * 2);
   height: 100%;
   background-image: linear-gradient(to top, rgba(255, 255, 255, 0), var(--strip-color) 180%);
} .ui-messages-dispatcher > .-message[data-severity="SUCCESS"]::before{
   --strip-color: var(--m-green-a400);
} .ui-messages-dispatcher > .-message[data-severity="INFO"]::before{
   --strip-color: var(--m-cyan-a400);
} .ui-messages-dispatcher > .-message[data-severity="WARNING"]::before{
   --strip-color: var(--m-yellow-a400);
} .ui-messages-dispatcher > .-message[data-severity="ERROR"]::before{
   --strip-color: var(--m-red-a400);
}


.ui-messages-dispatcher > .-message > .-content{
   grid-area: content;
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

      box-shadow: 0 -5px 20px -4px rgba(0,0,0,0.1);
   }
   .ui-messages-dispatcher > .-message{
      margin-top: 0;
      border-radius: 0;
      box-shadow: none;
   }

   .ui-messages-dispatcher > .-message + .-message::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(0,0,0,0.05);
   }
}

.ui-messages-dispatcher > .-message > .-content{
   display: flex;
   flex-direction: column;
   justify-content: center;
}
.ui-messages-dispatcher > .-message > .-content > .-title{
   cursor: default;
   font-size: 1em;
   letter-spacing: 0.02em;
}
.ui-messages-dispatcher > .-message > .-content > .-description{
   cursor: default;
   opacity: 0.7;
   font-size: 0.85em;
   letter-spacing: 0.02em;
}
.ui-messages-dispatcher > .-message > .-dismiss-btn,
.ui-messages-dispatcher > .-message > .-undo-btn{
   opacity: 1;
   color: var(--m-grey-700);
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
