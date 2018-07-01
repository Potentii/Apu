import Vue from 'vue'

class AtomicIdGenerator {
   constructor(){
      this.ids = new Set();
   }

   generate(){
      let id;
      do{
         id = String(Math.floor(Math.random() * 10000000000));
      } while(this.ids.has(id));
      this.ids.add(id);
      return id;
   }
}

const global_id_generator = new AtomicIdGenerator();

Vue.directive('id', {
   inserted(el){
      if(!el)
         return;
      if(!el.id)
         el.setAttribute('id', global_id_generator.generate());
   }
});
