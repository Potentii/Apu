const EventEmitter = nodeRequire('events');

const SEVERITY = Object.freeze({
   ERROR: 'ERROR',
   WARNING: 'WARNING',
   INFO: 'INFO',
   SUCCESS: 'SUCCESS'
});

const ACTION = Object.freeze({
   DISMISS: 'DISMISS',
   UNDO: 'UNDO'
});

export default class UIMessage extends EventEmitter {
   constructor(severity, content, description, life){
      super();
      this.severity = severity;
      this.content = content;
      this.description = description || null;
      this.life = life;
      this.date = Date.now();
   }

   static get SEVERITY(){
      return SEVERITY;
   }

   static get ACTION(){
      return ACTION;
   }

   hasAction(action_name){
      return !!this.listenerCount(action_name);
   }
}
