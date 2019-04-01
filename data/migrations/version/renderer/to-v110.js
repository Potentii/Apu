import SavedConnectionRoot from '/app/connection/saved-connection-root'
import SavedConnection     from '/app/connection/saved-connection'
import MigrationControl    from './migration-control';
const version = '1.1.0';



export async function migrate(){
	await moveConnectionsStorageToFiles();

	MigrationControl.setCurrentMigration(version);
}


async function moveConnectionsStorageToFiles(){
	if(MigrationControl.isMigrationGTE(version))
		return;

	const old_conns_str = window.localStorage.getItem('apu:saved-connections');
	if(old_conns_str){
		let old_conns = JSON.parse(old_conns_str);
		if(!Array.isArray(old_conns))
			throw new TypeError(`Invalid saved connections type on storage`);

		old_conns = old_conns.map(SavedConnection.from);

		await SavedConnectionRoot.saveAll(old_conns);
	}


}