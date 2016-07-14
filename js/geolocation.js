var markers = [];
var userMarkers = [];
var fitAlready = 0;
var centerAlready = 0;

function getLocation() {
    if (navigator.geolocation) {
        var geoPos = navigator.geolocation.watchPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}
    
function showPosition(position) {
    clearMarkers();
    userMarker(position);
    showMarkers();
}

function userMarker(currentLoc) {
    var lat = currentLoc.coords.latitude;
    var lng = currentLoc.coords.longitude;
    var userLatlng = new google.maps.LatLng(lat, lng);

    userMark.setMap(map);
    userMark.setPosition(userLatlng);
    userMarkers = [];
    userMarkers.push(userMark);
    if(centerAlready == 0) {
        map.setCenter(userMark.getPosition());
        centerAlready = 1;
    }
}

getLocation();