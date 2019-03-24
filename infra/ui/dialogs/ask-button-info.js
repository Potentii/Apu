const TYPES = Object.freeze({
	NEGATIVE: 'NEGATIVE',
	NEUTRAL: 'NEUTRAL',
	POSITIVE: 'POSITIVE'
});



export default class AskButtonInfo{
	constructor(label, type, is_icon){
		this.label = label;
		this.type = type;
		this.is_icon = is_icon;
	}

	get _id(){
		return '' + this.label + this.type + this.is_icon;
	}

	static get TYPES(){
		return TYPES;
	}

	get is_negative(){
		return this.type == TYPES.NEGATIVE;
	}

	get is_neutral(){
		return this.type == TYPES.NEUTRAL;
	}

	get is_positive(){
		return this.type == TYPES.POSITIVE;
	}
}