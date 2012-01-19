/*var $ = require('jquery');*/
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Right Rides Portal!'});
};