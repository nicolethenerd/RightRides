var tokens = ['5276-09d6f72728ee71713875d5d2c93304ba90ec040b'];  
var url = "https://api.geoloqi.com/1/location/last";

function locationCallback(data) {
  console.log(data);
  position = data.location.position;
  drawMarker('Navigator1', position.longitude, position.latitude);
}

function refresh_for_token(auth_token) {
  url_with_token = url + "?callback=?&oauth_token=" + auth_token;
  console.log("geoloqi url: " + url_with_token);
  $.getJSON(url_with_token, locationCallback);
}

function refresh_all() {
  for (i=0; i<tokens.length; i++) {
    console.log("refresh token: " + tokens[i]);
    refresh_for_token(tokens[i]);
  }
}

function drawMarker2(name, longitude, latitude) {
  console.log("drawing marker: " + name + " at (" + longitude + "," + latitude + ")");
}

