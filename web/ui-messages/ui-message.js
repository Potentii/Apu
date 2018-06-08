export default class UIMessage {
   constructor(severity, content, life){
      this.severity = severity;
      this.content = content;
      this.life = life;
      this.date = null;
   }
}
