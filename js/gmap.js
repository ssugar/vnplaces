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

    console.log(photos.length);

    if (photos.length < 4){
        photoHtml = '<img class="imgSlider" src="' + photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}) + '"></img>';
    }
    else
    {
        photoHtml = '<img class="imgSlider" src="' + photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}) + '"></img>' + '<img class="imgSlider" src="' + photos[1].getUrl({'maxWidth': 200, 'maxHeight': 200}) + '"></img>' + '<img class="imgSlider" src="' + photos[2].getUrl({'maxWidth': 200, 'maxHeight': 200}) + '"></img>' + '<img class="imgSlider" src="' + photos[3].getUrl({'maxWidth': 200, 'maxHeight': 200}) + '"></img>';
    }

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name
    });

    map.setCenter(marker.getPosition());

    placesList = document.getElementById('results');

    placesList.innerHTML = '<br/><p class="' + place.types[0] + '">' + place.name + '</p>';
    placesList.innerHTML += '<p class="' + place.types[0] + '">' + '<a href="https://maps.google.com/maps?q=' + place.formatted_address + '" target="_blank">' + place.formatted_address + '</a>' + '</p>';
    placesList.innerHTML += '<p class="' + place.types[0] + '">' + '<a href="https://maps.google.com/maps?q=' + place.formatted_address + '" target="_blank"><i class="material-icons">directions</i></a>' + '</p>';


    var deetrequest = {
        placeId: place.place_id
    };

    deetservice = new google.maps.places.PlacesService(map);
    deetservice.getDetails(deetrequest, deetcallback);

    function deetcallback(deetplace, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            placesList.innerHTML += '<p class="' + place.types[0] + '">' + '<a href="tel:' + deetplace.formatted_phone_number + '"><i class="material-icons">phone</i></a> <a href="' + deetplace.website + '" target="_blank"><i class="material-icons">public</i></a>' + '</p>';
            placesList.innerHTML += '<a class="w3-btn-floating" onclick="plusDivs(-1)">&#10094;</a>' + '<a class="w3-btn-floating" onclick="plusDivs(+1)">&#10095;</a>'
            placesList.innerHTML += '<p class="' + place.types[0] + '">' + photoHtml + '</p>';
        }
    }

    if (photos.length < 4){
        //no slider required;
    }
    else
    {
        initSlider();
    }

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<img src="' + photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}) + '"></img>');
        infowindow.open(map, this);
    });
}

initialize();

function initSlider(){
    var slideIndex = 1;
    showDivs(slideIndex);

    function plusDivs(n) {
        showDivs(slideIndex += n);
    }

    function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("imgSlider");
        if (n > x.length) {slideIndex = 1}
        if (n < 1) {slideIndex = x.length} ;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[slideIndex-1].style.display = "block";
    }  
}
