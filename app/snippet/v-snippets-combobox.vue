<template>
   <v-menu
      class="v-snippets-combobox"
      v-model="models_menu_opened"
      :close-on-content-click="true"
      auto
      content-class="v-snippets-combobox--menu"
      offset-y>
      <v-btn class="-load-model" slot="activator" dense flat>Load model <i class="-drop-arrow material-icons" :style="{ 'transform': 'rotateX(' + (models_menu_opened ? '180deg' : '0deg') + ')' }">keyboard_arrow_down</i></v-btn>

      <div class="-menu">
         <ul class="-snippets">
            <li class="-snippet" :class="{ '--selected': selected_snippet && selected_snippet._id == snippet._id }" v-for="snippet in sorted_snippets" @click="snippet_onClick(snippet)">
               {{ snippet.name }}
            </li>
         </ul>
      </div>
   </v-menu>
</template>



<script>
import { mapState } from 'vuex'
import SnippetVO    from './snippet-vo';



export default {

   name: 'v-snippets-combobox',


   props: {
		/**
       * The selected snippet ID
		 */
		'value': {
   		type: SnippetVO
      }
   },


   data(){
   	return {
			models_menu_opened: false,
         /**
          * The currently selected snippet, or null if none has been selected
          * @type {SnippetVO}
          */
			selected_snippet: null
      };
   },


   computed: {
   	...mapState('snippet', ['snippets']),



		/**
       * Retrieves the store's snippets sorted by their name
		 * @returns {SnippetVO[]} The sorted snippets array
		 */
		sorted_snippets(){
         return (this.snippets || [])
            .sort((s1,s2) => s1.name ? s1.name.localeCompare(s2.name) : 1)
      }
   },


   beforeMount(){
   	if(this.value)
         this.selected_snippet = this.snippets.find(s => s.id == this.value.id);
   	else
   		this.selected_snippet = null
   },


   methods: {
		snippet_onClick(snippet){
			this.selected_snippet = snippet;
			if(snippet)
            this.$emit('input', snippet);
			else
				this.$emit('input', null);
      }
   }

}
</script>



<style>
.v-snippets-combobox .-load-model .-drop-arrow{
   transition: transform 0.2s ease;
}
.v-snippets-combobox--menu{
   background-color: var(--m-grey-50);
   border-radius: 10px !important;
}
.v-snippets-combobox--menu > .-menu > .-snippets > .-snippet{
   padding: 0.8em 1em;
}
.v-snippets-combobox--menu > .-menu > .-snippets > .-snippet.--selected{
   background-color: var(--m-grey-300);
}
.v-snippets-combobox--menu > .-menu > .-snippets > .-snippet:hover{
   cursor: pointer;
   background-color: var(--m-grey-300);
}
</style>
