/**
 *
 * @param {String[]} names
 * @param {String} new_name
 * @return {String}
 */
export function getWithNamingVersionSuffix(names, new_name){
	let new_name_copy = new_name + '';
	if(names.some(name => name == new_name_copy)){
		const current_naming_version = getNamingVersion(new_name_copy);
		if(current_naming_version !== null){
			new_name_copy = updateNamingVersion(new_name_copy, current_naming_version + 1);
		} else{
			new_name_copy += ' (1)';
		}

		if(names.some(name => name == new_name_copy))
			new_name_copy = getWithNamingVersionSuffix(names, new_name_copy);
	}

	return new_name_copy;
}


function getNamingVersionRegex(){
	return /\((\d+)\)\s*$/;
}

/**
 *
 * @param {String} name
 * @Return {Number}
 */
export function getNamingVersion(name){
	const match = getNamingVersionRegex().exec(name);
	return (!!match)
		? Number(match[1])
		: null;
}

export function updateNamingVersion(name, with_version){
	return name.replace(getNamingVersionRegex(), `(${with_version})`);
}