export default class UIMessage {
   constructor(severity, content, description, life){
      this.severity = severity;
      this.content = content;
      this.description = description || null;
      this.life = life;
      this.date = Date.now();

      this._SEVERITY = Object.freeze({
         ERROR: 'ERROR',
         WARNING: 'WARNING',
         INFO: 'INFO'
      });
   }

   static get SEVERITY(){
      return this._SEVERITY;
   }
}
