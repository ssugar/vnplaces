var restIcon = {
    url: 'https://maps.google.com/mapfiles/kml/shapes/dining.png',
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 0)
};

var userIcon = {
    url: 'https://chadkillingsworth.github.io/geolocation-marker/images/gpsloc.png',
    scaledSize: new google.maps.Size(17, 17),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 0)
};

var marker = new google.maps.Marker({
    icon: restIcon     
});

var userMark = new google.maps.Marker({
    icon: userIcon,      
    title: "Your location"
});

function setMapOnAll(map) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].getPosition());
    }
    for (var i = 0; i < userMarkers.length; i++) {
        userMarkers[i].setMap(map);
        bounds.extend(userMarkers[i].getPosition());
    }
    if(markers.length > 0 && userMarkers.length > 0 && fitAlready == 0)  //if both markers have been set, and no fit yet, fit bounds.
    {
        fitAlready = 1;
        map.fitBounds(bounds);
    }
}

function clearMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
    for (var i = 0; i < userMarkers.length; i++) {
        userMarkers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    clearMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
    userMarkers = [];
}
