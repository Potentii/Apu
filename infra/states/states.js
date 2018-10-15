export default class States{
   constructor(){
      this._active = [];
   }



	/**
    * Adds a new state to the active states set
	 * @param {String} state The state name to be added
	 */
	add(state){
      if(!this.is(state))
         this._active.push(state);
   }

   remove(state){
      const index = this._active.indexOf(state);
      if(index > -1)
         this._active.splice(index, 1);
   }

   toggle(state){
      if(this.is(state))
         this.remove(state);
      else
         this.add(state);
   }



	/**
    * Checks if the given state is currently active
	 * @param {String} state The state name to be checked
	 * @returns {boolean} Whether the state is active or not
	 */
	is(state){
      return this._active.includes(state);
   }



	/**
	 * Checks if the given state is not currently active
	 * @param {String} state The state name to be checked
	 * @returns {boolean} Whether the state is not active
	 */
   not(state){
      return !this.is(state);
   }

   get current(){
      return this._active;
   }

}
