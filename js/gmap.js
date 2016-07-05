var map;
var service;
var infowindow;

function initialize() {
    var hcmc = new google.maps.LatLng(10.773599,106.694420);

    map = new google.maps.Map(document.getElementById('map'), {
        center: hcmc,
        zoom: 15
    });

    var request = {
    location: hcmc,
    radius: '500',
    query: 'restaurant'
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
    }
    }
}

initialize();
