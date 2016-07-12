var map;
var infowindow;
var gmapService;

//10.77 x 106.69 = Cho Ben Thanh
var pos = new google.maps.LatLng(10.773599,106.694420);

function initMap() {
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
        name: "EOSaigon"
    });

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
    map.setCenter(pos);
    gmapService = new google.maps.places.PlacesService(map);
}

//Called from topList.js on click of svg table row
function requestRest(q) {
    var request = {
        location: pos,
        radius: '5000',
        query: q
    };
    infowindow = new google.maps.InfoWindow();
    clearListingsBy();
    gmapService.textSearch(request, requestRestCallback);
}

function requestRestCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarker(results[0]);
        fillBasicResults(results[0]);
        getDetailedResults(results[0]);
    }
}

function createMarker(place) {
    var photos = place.photos;
    if (!photos) {
        return;
    }

    marker.setMap(map);
    marker.setPosition(place.geometry.location);
    markers = [];
    markers.push(marker);
    map.setCenter(marker.getPosition());
    showMarkers();

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<img src="' + photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}) + '"></img>');
        infowindow.open(map, this);
    });
}

function fillBasicResults(place) {
    placesList = document.getElementById('results');
    placesList.innerHTML = '<br/><p class="' + place.types[0] + '">' + place.name + '</p>';
    placesList.innerHTML += '<p class="' + place.types[0] + '">' + '<a href="https://maps.google.com/maps?q=' + place.formatted_address + '" target="_blank">' + place.formatted_address + '</a>' + '</p>';
}

function getDetailedResults(place) {
    var deetrequest = {
        placeId: place.place_id
    };
    gmapService.getDetails(deetrequest, deetCallback);
}

function deetCallback(deetplace, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        fillResultsBox(deetplace);
    }
}

function fillResultsBox(deetplace) {
    placesList = document.getElementById('results');
    placesList.innerHTML += '<p class="' + deetplace.types[0] + '">' + '<a href="https://maps.google.com/maps?q=' + deetplace.formatted_address + '" target="_blank"><i class="material-icons">directions</i></a>&nbsp;<a href="tel:' + deetplace.formatted_phone_number + '"><i class="material-icons">phone</i></a>&nbsp;<a href="' + deetplace.website + '" target="_blank"><i class="material-icons">public</i></a>' + '</p>';

    deetplace.photos.forEach(function(item, ind){
        if(ind == 0){
            photoHtml = '<img class="imgSlider" src="' + deetplace.photos[ind].getUrl({'maxWidth': 400, 'maxHeight': 400}) + '"></img>';
        }
        else{
            photoHtml += '<img class="imgSlider" src="' + deetplace.photos[ind].getUrl({'maxWidth': 400, 'maxHeight': 400}) + '"></img>'; 
        }
    });

    placesList.innerHTML += '<div class="photoDisplay">' + photoHtml + '</div>';

    if (deetplace.photos.length > 1){
        placesList.innerHTML += '<a class="w3-btn-floating-left" onclick="plusDivs(-1)"><i class="material-icons">keyboard_arrow_left</i></a>' + '<a class="w3-btn-floating-right" onclick="plusDivs(+1)"><i class="material-icons">keyboard_arrow_right</i></a>';
        initImgSlider(); //calling initImgSlider function from gImgSlider.js
    }
}

function clearListingsBy() {
    d3.select("div#map").selectAll("div.gm-style-cc").html("");
    console.log("ran clear");
}


initMap();
