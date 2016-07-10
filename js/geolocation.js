
function getLocation() {
    if (navigator.geolocation) {
        var geoPos = navigator.geolocation.watchPosition(showPosition);
        console.log(geoPos); 
        return geoPos;
    } else { 
        return "Geolocation is not supported by this browser.";
    }
}
    
function showPosition(position) {
    console.log(position.coords);
    userMarker(position)
}

function userMarker(currentLoc) {
    var lat = currentLoc.coords.latitude;
    var lng = currentLoc.coords.longitude;
    var userLatlng = new google.maps.LatLng(lat, lng);
    console.log(userLatlng);
    var marker = new google.maps.Marker({
        map: map,
        position: userLatlng,
        title: "You are at: " + lat + " , " + lng
    });

    map.setCenter(marker.getPosition());
}

