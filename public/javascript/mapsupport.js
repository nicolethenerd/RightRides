var map;
var geocoder;
var customMarkers = [];
var geoloqi_refresh_rate = 15000; //15 sec
function initializeMapping() {
    var myOptions = {
        center: new google.maps.LatLng(40.767781718519, -73.985238918519),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    geocoder = new google.maps.Geocoder();

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var serviceAreas = new google.maps.KmlLayer('http://maps.google.com/maps/ms?ie=UTF8&oe=UTF8&authuser=0&msa=0&output=nl&msid=209738999438525933783.00000111e2265debed28b');
    serviceAreas.setMap(map);


   setTimeout("autoRefreshGeoloqi();", geoloqi_refresh_rate);
  }
  
  function autoRefreshGeoloqi(){
    refreshMarkers();
    setTimeout("autoRefreshGeoloqi();", geoloqi_refresh_rate);
  }

  function refreshMarkers(){        
    var pending_geoloqi_calls = gl_pendingRequests();

    if(pending_geoloqi_calls == 0){
      console.log("Num of customMarkers: " +customMarkers.length);
      clearMarkers();
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

    console.log(marker)

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

function geocode(this_address) {
    //var address = document.getElementById("address").value;			
    geocoder.geocode({
        'address': this_address,
        'partialmatch': true
    },
    geocodeResult);
}

function clearMarkers() {
    while (customMarkers.length > 0)
    {
        marker = customMarkers.pop();
        marker.setMap(null);
    }
}

function geocodeResult(results, status) {
    if (status == 'OK' && results.length > 0) {
        var marker, i;

        marker = new google.maps.Marker({
            //position: new google.maps.LatLng(results[0].latitude, results[0].longitude),
            position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
            map: map
        });
        customMarkers.push(marker);
    } else {
        alert("Geocode was not successful for the following reason: " + status);
    }
}