const fs = nodeRequire('fs');
const path = nodeRequire('path');
const util = nodeRequire('util');
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const remote = nodeRequire('electron').remote;
const app = remote.app;

const data_dir = path.join(app.getPath('appData'), './Apu/data');

export async function save(key, obj){
   await writeFile(path.join(data_dir, './' + key), JSON.stringify(obj));
   // localStorage.setItem(key, JSON.stringify(obj));
}

export async function get(key){
   const str = await readFile(path.join(data_dir, './' + key));
   // const str = localStorage.getItem(key);
   if(str)
      return JSON.parse(str.toString());

   return null;
}

export async function getArray(key){
   const array = (await get(key)) || [];
   if(!Array.isArray(array))
      throw new TypeError(`The cache "${key}" could not be read, as it must store an array`);

   return array;
}

export async function addToArray(key, item){
   const array = await getArray(key);

   array.push(item);

   await save(key, array);
}
