const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const createDir = util.promisify(mkdirp);
const { app, BrowserWindow } = require('electron');



module.exports = async function(){
	await migrateStorageToDataFile('apu:saved-connections', 'connections.json');
	await migrateStorageToDataFile('apu:queues', 'queues.json');
};


async function migrateStorageToDataFile(storage_key, file_name){
	const all_windows = BrowserWindow.getAllWindows();
	if(!all_windows || !all_windows.length)
		throw new Error('No browser windows were found');

	const main_window = all_windows[0];
	const saved_connections_str = await main_window.webContents.executeJavaScript(`localStorage ? localStorage.getItem('${storage_key}') : null`);

	if(!saved_connections_str)
		return;

	const app_data_dir = path.join(app.getPath('appData'), './Apu/data');

	await createDir(app_data_dir);

	const connections_file = path.join(app_data_dir, './' + file_name);

	await writeFile(connections_file, saved_connections_str, 'utf-8');

	await main_window.webContents.executeJavaScript(`localStorage.removeItem('${storage_key}')`);
}