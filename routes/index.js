/*var $ = require('jquery');*/
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Right Rides Portal!'});
};

exports.create_password = function(req, res){
	res.render('create_password', {title: 'Add a password for this week'});
};
