var userIcon = {
    url: 'https://chadkillingsworth.github.io/geolocation-marker/images/gpsloc.png',
    scaledSize: new google.maps.Size(17, 17),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 0)
};

var userMark = new google.maps.Marker({
    icon: userIcon,      
    title: "Your location"
});

function getLocation() {
    if (navigator.geolocation) {
        var geoPos = navigator.geolocation.watchPosition(showPosition);
        //var geoPos = navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}
    
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function showPosition(position) {
    //console.log(position.coords);
    //clearMarkers();
    userMarker(position);
    showMarkers();
}

function userMarker(currentLoc) {
    var lat = currentLoc.coords.latitude;
    var lng = currentLoc.coords.longitude;
    var userLatlng = new google.maps.LatLng(lat, lng);

    userMark.setMap(map);
    userMark.setPosition(userLatlng);

    if(!markers.include(userMark)){
        markers.push(userMark);
        centerOnUserMark(userMark);
    }
}

function centerOnUserMark(userMark){
    map.setCenter(userMark.getPosition());
}

getLocation();