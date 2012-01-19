var tokens = [
  '5276-09d6f72728ee71713875d5d2c93304ba90ec040b',
  '5275-63de6cf05dbf8ea2076b29573fdf1f846967727e'
];  
var url = "https://api.geoloqi.com/1/location/last";
var url2 = "https://api.geoloqi.com/1/account/profile";
var i = 0;

function refreshForToken(auth_token) {
  url_with_token = url + "?callback=?&oauth_token=" + auth_token;
  console.log("geoloqi url: " + url_with_token);
  $.getJSON(url_with_token, function(data) {
    url_with_token2 = url2 + "?callback=?&oauth_token=" + auth_token;
    console.log("geoloqi url: " + url_with_token);
    position = data.location.position;
    //$.getJSON(url_with_token2, function(data2) {
    //  console.log(data2);
    //  drawMarker(data2.display_name, position.latitude, position.longitude);
    //});
    drawMarker('Navigator'+(++i), position.latitude, position.longitude);
  });
}

function refreshAll() {
  for (j=0; j<tokens.length; j++) {
    console.log("refresh token: " + tokens[j]);
    refreshForToken(tokens[j]);
  }
}


