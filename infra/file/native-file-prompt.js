const remote = nodeRequire('electron').remote;


export function prompt(options={}){
	return new Promise((resolve, reject) => {
		remote.dialog.showOpenDialog(remote.getCurrentWindow(), options, file_paths => resolve(file_paths));
	});
}