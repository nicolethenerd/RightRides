var $ = require('jquery');
/*
 * GET home page.
 */

function locationCallback(json) {
        console.log(json);
        alert("Longitude: " + json.location.position.longitude +"\nLatitude: " + json.location.position.latitude);
      }


exports.index = function(req, res){
  var url = "https://api.geoloqi.com/1/location/last?oauth_token=";
  var url_with_token = url + "?callback=?&oauth_token=5276-09d6f72728ee71713875d5d2c93304ba90ec040b";
  $.getJSON(url_with_token, locationCallback);
  console.log("SOMETHING!");

  res.render('index', { title: 'Right Rides Portal!'});
};