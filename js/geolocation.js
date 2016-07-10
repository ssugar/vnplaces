var userMark;

function getLocation() {
    if (navigator.geolocation) {
        var geoPos = navigator.geolocation.watchPosition(showPosition);
        //var geoPos = navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        return "Geolocation is not supported by this browser.";
    }
}
    
function showPosition(position) {
    console.log(position.coords);
    userMarker(position);
}

function userMarker(currentLoc) {
    var lat = currentLoc.coords.latitude;
    var lng = currentLoc.coords.longitude;
    var userLatlng = new google.maps.LatLng(lat, lng);
    if(userMark == null){
        userMark = new google.maps.Marker({
            map: map,
            position: userLatlng,
            title: "Your location"
        });
    }
    userMark.setPosition(userLatlng);
}

function centerOnUserMark(){
    map.setCenter(userMark.getPosition());
}

getLocation();

centerOnUserMark();
