var map;
var infowindow;

function initialize(q) {

    var styles = [{
    stylers: [{
        hue: "#8DC9FF"
    }, {
        saturation: -50
    }, {
        lightness: 7
    }, {
        weight: 1
    }

    ]
    }, {
    featureType: "road",
    elementType: "geometry",
    stylers: [{
        lightness: 100
    }, {
        visibility: "on"
    }]
    }, {
    featureType: "road",
    elementType: "labels",
    stylers: [{
        visibility: "on"
    }]
    }];

    var styledMap = new google.maps.StyledMapType(styles, {
    name: "vnplaces"
    });

    var pos = new google.maps.LatLng(10.773599,106.694420);
    var center = new google.maps.LatLng(10.773599,106.694420);

    map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: center,
    zoom: 14,
    streetViewControl: false,
    panControl: false,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
    });

    var newPos = new google.maps.LatLng(10.773599,106.694420);

    var request = {
        location: pos,
        radius: '5000',
        query: q
    };


    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
    }
    }
}

function createMarker(place) {
    var photos = place.photos;
    if (!photos) {
        return;
    }

    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
        icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
    });

    map.setCenter(marker.getPosition());

    placesList = document.getElementById('results');

    placesList.innerHTML = '<p class="' + place.types[0] + '">' + place.name + '</p>';
    placesList.innerHTML += '<p class="' + place.types[0] + '">' + place.formatted_address + '</p>';

    var deetrequest = {
        placeId: place.place_id
    };

    deetservice = new google.maps.places.PlacesService(map);
    deetservice.getDetails(deetrequest, deetcallback);

    function deetcallback(deetplace, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            placesList.innerHTML += '<p class="' + place.types[0] + '">' + deetplace.formatted_phone_number + '</p>';
        }
    }

    placesList.innerHTML += '<p class="' + place.types[0] + '">' + '<img src="' + photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}) + '"></img>' + '</p>';

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(placesList.innerHTML);
        infowindow.open(map, this);
    });
}

initialize('ho chi minh au parc');