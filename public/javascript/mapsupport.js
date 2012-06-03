var map;
var geocoder;
var customMarkers = [];
var geoloqiMarkers = [];
var directionsDisplay;
var directionsService;
var serviceAreas = new google.maps.KmlLayer('http://maps.google.com/maps/ms?ie=UTF8&oe=UTF8&authuser=0&msa=0&output=nl&msid=209738999438525933783.00000111e2265debed28b');
var geoloqi_refresh_rate = 15000; //15 sec

function initializeMapping() {
  var myOptions = {
    center: new google.maps.LatLng(40.767781718519, -73.985238918519),  // New York City
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  geocoder = new google.maps.Geocoder();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
 
  serviceAreas.setMap(map);
  directionsDisplay.setMap(map);

  setTimeout("autoRefreshGeoloqi();", geoloqi_refresh_rate);
}
  
function autoRefreshGeoloqi() {
  refreshMarkers();
  setTimeout("autoRefreshGeoloqi();", geoloqi_refresh_rate);
}

function refreshMarkers() {
  var pending_geoloqi_calls = gl_pendingRequests();

  if(pending_geoloqi_calls == 0){
    console.log("Num of customMarkers: " +customMarkers.length);
    clearGeoloqiMarkers();
    gl_refreshAll();
  }else{
    console.log("Skipping call to geoloqi, " + pending_geoloqi_calls + " calls currently open");
  }
}

function drawMarker(profile, latitude, longitude) {
  console.log("drawing " + profile.display_name + " at " + latitude + "," + longitude);
  var marker;
  var infowindow = new google.maps.InfoWindow();

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    map: map,
    icon: '/images/car_' + profile.display_name.toLowerCase() + '.png'
  });
  geoloqiMarkers.push(marker);

  console.log(marker);

  google.maps.event.addListener(marker, 'click', (function(marker, profile) {
    return function() {
      var html = "<table border='0'><tr>" +
        "<td><img src='" + profile.profile_image + "' /></td>" +
        "<td>" + profile.display_name + "<br />" + profile.phone + "</td>" +
        "</tr></table>";
      infowindow.setContent(html);
      infowindow.open(map, marker);
    }
  })(marker, profile));
}

function clearCustomMarkers() {
  while(customMarkers.length > 0) {
    var marker = customMarkers.pop();
    marker.setMap(null);
  }
}

function clearGeoloqiMarkers() {
  while(geoloqiMarkers.length > 0) {
    var marker = geoloqiMarkers.pop();
    marker.setMap(null);
  }
}

function geocode(address_string) {
  var addresses = address_string.split(" to ");
  if(addresses.length == 1) {
    geocoder.geocode({'address': address_string, 'partialmatch': true}, geocodeResult);
  } else if(addresses.length == 2) {
    displayDirections(addresses);
  } else {
    alert("Multiple destinations are not supported yet.");
  }
}

function geocodeResult(results, status) {
  if (status == 'OK' && results.length > 0) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
      map: map
    });
    customMarkers.push(marker);
  } else {
    alert("Geocode was not successful for the following reason: " + status);
  }
}

function displayDirections(addresses) {
  var request = {
    origin: addresses[0],
    destination: addresses[1],
    travelMode: google.maps.TravelMode.DRIVING,
    region: 'United States'
  }
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      console.log("DirectionsService was not successful for the following reason: " + status)
    }
  });
}
