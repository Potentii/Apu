export default {
	namespaced: true,



	state: {
		dialog_intents: []
	},



	getters: {
		getDialogIntent: state => dialog_name => state.dialog_intents.find(intent => intent.dialog_name == dialog_name)
	},



	actions: {
		async openDialog(context, { dialog_name, data, onDismiss }){
			context.state.dialog_intents.push({
				dialog_name,
				data: data,
				onDismiss: typeof onDismiss === 'function' ? onDismiss : null
			});
		},

		async dismissDialog(context, { dialog_name, data }){
			const intent_index = context.state.dialog_intents.findIndex(intent => intent.dialog_name === dialog_name);

			if(intent_index < 0)
				throw new Error(`Cannot dismiss dialog "${dialog_name}", it wasn't opened`);

			const intent = context.state.dialog_intents[intent_index];

			if(typeof intent.onDismiss === 'function'){
				const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
				if(intent.onDismiss instanceof AsyncFunction)
					await intent.onDismiss.bind(null, data)();
				else
					intent.onDismiss.bind(null, data)();
			}

			context.state.dialog_intents.splice(intent_index, 1);
		}
	}

};
