
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
    return position.coords;
}