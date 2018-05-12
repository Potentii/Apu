
export function getObj(key){
   const raw_data = localStorage.getItem(key);

   if(raw_data === null || raw_data === undefined)
      return null;

   return JSON.parse(raw_data);
}

export function getObjAndCast(key, type){
   const obj = getObj(key);

   if(obj === null || obj === undefined)
      return obj;

   if(typeof obj != 'object')
      throw new TypeError(`The stored item is not a valid object`);

   if(type){
      if(typeof type.from === 'function')
         return type.from(obj);
      else
         throw new Error(`The given "type" parameter must implement the static "from(obj)" method`);
   }

   return obj;
}

export function getArrayAndCast(key, type){
   const arr = getObj(key);

   if(arr === null || arr === undefined)
      return arr;

   if(!Array.isArray(arr))
      throw new TypeError(`The stored item is not a valid array`);

   if(type){
      if(typeof type.from === 'function')
         return arr.map(o => type.from(o));
      else
         throw new Error(`The given "type" parameter must implement the static "from(obj)" method`);
   }

   return arr;
}


export function saveObj(key, obj = null){
   if(typeof obj != 'object')
      throw new TypeError(`The item to be stored must be an object`);

   if(obj === null)
      localStorage.setItem(key, obj);
   else
      localStorage.setItem(key, JSON.stringify(obj));
}
