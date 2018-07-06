export function save(key, obj){
   localStorage.setItem(key, JSON.stringify(obj));
}

export function get(key){
   const str = localStorage.getItem(key);
   if(str)
      return JSON.parse(str);

   return null;
}

export function getArray(key){
   const array = get(key) || [];
   if(!Array.isArray(array))
      throw new TypeError(`The cache "${key}" could not be read, as it must store an array`);

   return array;
}

export function addToArray(key, item){
   const array = getArray(key);

   array.push(item);

   save(key, array);
}
