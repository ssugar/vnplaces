var markers = [];
var userMarkers = [];
var fitAlready = 0;

function getLocation() {
    if (navigator.geolocation) {
        var geoPos = navigator.geolocation.watchPosition(showPosition);
        //var geoPos = navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}
    
function showPosition(position) {
    //console.log(position.coords);
    clearMarkers();
    userMarkers = [];
    userMarker(position);
    showMarkers();
}

function userMarker(currentLoc) {
    var lat = currentLoc.coords.latitude;
    var lng = currentLoc.coords.longitude;
    var userLatlng = new google.maps.LatLng(lat, lng);

    userMark.setMap(map);
    userMark.setPosition(userLatlng);
    userMarkers.push(userMark);
    //centerOnUserMark(userMark); 
}

function centerOnUserMark(userMark){
    map.setCenter(userMark.getPosition());
}

getLocation();