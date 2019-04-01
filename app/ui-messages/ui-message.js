const EventEmitter = electronRequire('events');

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

const LIFE = Object.freeze({
   SHORT: 4000,
   LONG: 8000,
   SUPER_LONG: 16000
});

export default class UIMessage extends EventEmitter {
   constructor(severity, title, description, life){
      super();
      this.severity = severity;
      this.title = title;
      this.description = description || null;
      this.life = life;
      this.date = Date.now();
   }

   get id(){
      return '' + this.severity + this.title + this.description + this.date + this.life;
   }

   static get SEVERITY(){
      return SEVERITY;
   }

   static get SUCCESS(){
      return SEVERITY.SUCCESS;
   }

   static get ERROR(){
      return SEVERITY.ERROR;
   }

   static get WARNING(){
      return SEVERITY.WARNING;
   }

   static get INFO(){
      return SEVERITY.INFO;
   }

   static get ACTION(){
      return ACTION;
   }

   static get LIFE(){
      return LIFE;
   }

   hasAction(action_name){
      return !!this.listenerCount(action_name);
   }
}
