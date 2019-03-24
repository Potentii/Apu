<template>
   <div class="v-dialog-caller-mixin"></div>
</template>



<script>
export default{
	name: 'v-dialog-caller-mixin',


   methods: {
      async openDialog(dialog_name, data, onDismiss){
      	if(!dialog_name)
      		throw new Error(`Cannot open dialog: Invalid dialog name "${dialog_name}"`);

      	const intent = {
				dialog_name,
				data: data,
				onDismiss: onDismiss
         };

      	await this.$store.dispatch('-modals-plugin/openDialog', intent);
      },


      async dismissDialog(dialog_name, data){
			if(!dialog_name)
				throw new Error(`Cannot dismiss dialog: Invalid dialog name "${dialog_name}"`);

			await this.$store.dispatch('-modals-plugin/dismissDialog', { dialog_name, data });
      }
   }
}
</script>



<style>
</style>
