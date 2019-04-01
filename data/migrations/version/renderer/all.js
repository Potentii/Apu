import * as to_v110     from './to-v110'
import MigrationControl from './migration-control'



export async function migrate(){
	MigrationControl.resetCurrentMigration();
	if(!MigrationControl.getMigration())
		MigrationControl.setMigration('0.0.0');

	await to_v110.migrate();

	MigrationControl.setMigrationAsCurrent();
	MigrationControl.resetCurrentMigration();
}