import * as semver from 'semver'



export default class MigrationControl{

	constructor(){}


	static resetMigration(){
		window.localStorage.removeItem('apu:migration');
	}
	static resetCurrentMigration(){
		window.localStorage.removeItem('apu:curr-migration');
	}


	static setMigration(version){
		window.localStorage.setItem('apu:migration', semver.valid(version));
	}
	static setCurrentMigration(version){
		window.localStorage.setItem('apu:curr-migration', semver.valid(version));
	}


	static getMigration(){
		return semver.valid(window.localStorage.getItem('apu:migration'));
	}
	static getCurrentMigration(){
		return semver.valid(window.localStorage.getItem('apu:curr-migration'));
	}


	static isMigrationGT(version){
		return semver.gt(MigrationControl.getMigration(), version);
	}
	static isCurrentMigrationGT(){
		return semver.gt(MigrationControl.getCurrentMigration(), version);
	}


	static isMigrationGTE(version){
		return semver.gte(MigrationControl.getMigration(), version);
	}
	static isCurrentMigrationGTE(){
		return semver.gte(MigrationControl.getCurrentMigration(), version);
	}


	static isMigrationLT(version){
		return semver.lt(MigrationControl.getMigration(), version);
	}
	static isCurrentMigrationLT(){
		return semver.lt(MigrationControl.getCurrentMigration(), version);
	}


	static isMigrationLTE(version){
		return semver.lte(MigrationControl.getMigration(), version);
	}
	static isCurrentMigrationLTE(){
		return semver.lte(MigrationControl.getCurrentMigration(), version);
	}


	static isMigrationEQ(version){
		return semver.eq(MigrationControl.getMigration(), version);
	}
	static isCurrentMigrationEQ(){
		return semver.eq(MigrationControl.getCurrentMigration(), version);
	}


	static setMigrationAsCurrent(){
		MigrationControl.setMigration(MigrationControl.getCurrentMigration());
	}
}