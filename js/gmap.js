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
        }]}, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
                lightness: 100
        }, {
            visibility: "on"
        }]}, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "on"
    }]}];

    var styledMap = new google.maps.StyledMapType(styles, {
        name: "vnplaces"
    });

    //10.77 x 106.69 = Cho Ben Thanh
    var pos = new google.maps.LatLng(10.773599,106.694420);

    map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
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

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    if(q == null){
        map.setCenter(pos);
    }
    else{
        var request = {
            location: pos,
            radius: '5000',
            query: q
        };

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    }
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarker(results[0]);
    }
}

function createMarker(place) {
    var photos = place.photos;
    if (!photos) {
        return;
    }

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name
    });

    map.setCenter(marker.getPosition());

    placesList = document.getElementById('results');

    placesList.innerHTML = '<br/><p class="' + place.types[0] + '">' + place.name + '</p>';
    placesList.innerHTML += '<p class="' + place.types[0] + '">' + place.formatted_address + '</p>';

    var deetrequest = {
        placeId: place.place_id
    };

    deetservice = new google.maps.places.PlacesService(map);
    deetservice.getDetails(deetrequest, deetcallback);

    function deetcallback(deetplace, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            placesList.innerHTML += '<p class="' + place.types[0] + '">' + '<a href="tel:' + deetplace.formatted_phone_number + '"><i class="material-icons">phone</i></a>' + '</p>';
            placesList.innerHTML += '<p class="' + place.types[0] + '">' + '<a href="' + deetplace.website + '" target="_blank"><i class="material-icons">public</i></a>' + '</p>';
            placesList.innerHTML += '<p class="' + place.types[0] + '">' + '<img src="' + photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}) + '"></img>' + '</p>';
        }
    }

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<img src="' + photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}) + '"></img>');
        infowindow.open(map, this);
    });
}

initialize();