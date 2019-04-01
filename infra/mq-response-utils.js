/**
 *
 * @param  {Object} res [description]
 * @return {[type]}     [description]
 */
module.exports.parseData = function(res){
   res.data = res.data ? JSON.parse(res.data) : res.data;
   return res;
}

/**
 *
 * @param  {Object} res [description]
 * @return {[type]}     [description]
 */
module.exports.throwOnErrors = function(res){
   if(res.error)
      throw res.error;
   return res;
}
