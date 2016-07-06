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
    var specific_icon;
    var school_icon = 'https://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';
    var food_icon = 'https://www.google.com/intl/en_us/mapfiles/ms/micons/yellow-dot.png';
    var park_icon = 'https://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png';

    switch (true) {
    case (place.types.indexOf('school') != -1):
        specific_icon = school_icon;
        break;
    case (place.types.indexOf('restaurant') != -1):
        specific_icon = food_icon;
        break;
    case (place.types.indexOf('park') != -1):
        specific_icon = park_icon;
        break;
    }

    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: specific_icon
    });

    map.setCenter(marker.getPosition());

    placesList = document.getElementById('results');

    placesList.innerHTML = '<p class="' + place.types[0] + '">' + place.name + '</p>';
    placesList.innerHTML += '<p class="' + place.types[0] + '">' + place.formatted_address + '</p>';

    totalSchool = $('.school').size();
    $('#school').text('Schools: ' + totalSchool);
    totalFood = $('.restaurants').size();
    $('#food').text('Restaurants: ' + totalFood);
    totalParks = $('.park').size();
    $('#park').text('Parks: ' + totalParks);

    google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);

    });
}

initialize('ho chi minh au parc');