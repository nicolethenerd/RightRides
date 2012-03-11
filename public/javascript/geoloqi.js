var tokens = [
  '5276-09d6f72728ee71713875d5d2c93304ba90ec040b',
  '5275-63de6cf05dbf8ea2076b29573fdf1f846967727e'
];
var gl_location_url = "https://api.geoloqi.com/1/location/last";
var gl_profile_url = "https://api.geoloqi.com/1/account/profile";
var i = 0;

function gl_profile_callback(data, position) {
  console.log(data);
  drawMarker(data, position.latitude, position.longitude);
}

function gl_location_callback(data, auth_token) {
  var position = data.location.position;
  var url_with_token = gl_profile_url + "?callback=?&oauth_token=" + auth_token;
  console.log("calling geoloqi url: " + url_with_token);
  $.getJSON(url_with_token, function(data) {gl_profile_callback(data, position);});
}

function refreshForToken(auth_token) {
  var url_with_token = gl_location_url + "?callback=?&oauth_token=" + auth_token;
  console.log("calling geoloqi url: " + url_with_token);
  $.getJSON(url_with_token, function(data) {gl_location_callback(data, auth_token);});
}

function refreshAll() {
  for (j=0; j<tokens.length; j++) {
    refreshForToken(tokens[j]);
  }
}


