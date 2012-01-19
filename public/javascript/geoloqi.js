var tokens = ['5276-09d6f72728ee71713875d5d2c93304ba90ec040b'];  
var url = "https://api.geoloqi.com/1/location/last";

function locationCallback(data) {
  console.log(data);
  position = data.location.position;
  drawMarker('Navigator1', position.latitude, position.longitude);
}

function refreshForToken(auth_token) {
  url_with_token = url + "?callback=?&oauth_token=" + auth_token;
  console.log("geoloqi url: " + url_with_token);
  $.getJSON(url_with_token, locationCallback);
}

function refreshAll() {
  for (i=0; i<tokens.length; i++) {
    console.log("refresh token: " + tokens[i]);
    refreshForToken(tokens[i]);
  }
}


