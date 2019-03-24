import store from './store'
import VDialogCallerMixin from './v-dialog-caller-mixin'
import VPDialog from './v-p-dialog'


export default {
	install(Vue, options = {}){

		if(!options.store)
			throw new Error(`The plugin couldn't find the app's store object, make sure it's being passed as "Vue.use(Plugin, { store });"`)

		if(typeof options.store.registerModule !== 'function')
			throw new Error(`The passed store object isn't a valid Vuex store`);

		options.store.registerModule('-modals-plugin', store);

		Vue.component('v-p-dialog', VPDialog);
		Vue.mixin(VDialogCallerMixin);
	}
}