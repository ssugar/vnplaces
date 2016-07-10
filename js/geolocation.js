
function getLocation() {
    if (navigator.geolocation) {
        var geoPos = navigator.geolocation.watchPosition(showPosition); 
        return geoPos;
    } else { 
        return "Geolocation is not supported by this browser.";
    }
}
    
function showPosition(position) {
   return position.coords;
}