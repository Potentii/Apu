const fs = nodeRequire('fs');
const path = nodeRequire('path');
const mkdirp = nodeRequire('mkdirp');
const util = nodeRequire('util');
const writeFile = util.promisify(fs.writeFile);
const createDir = util.promisify(mkdirp);
const remote = nodeRequire('electron').remote;
const app = remote.app;



export default async function(){
	// const saved_connections_str = localStorage.getItem('apu:saved-connections');
	//
	// if(!saved_connections_str)
	// 	return;
	//
	// const app_data_dir = path.join(app.getPath('appData'), './Apu/data');
	//
	// await createDir(app_data_dir);
	//
	// const connections_file = path.join(app_data_dir, './connections.json');
	//
	// await writeFile(connections_file, saved_connections_str, 'utf-8');

	// localStorage.removeItem('apu:saved-connections');
}