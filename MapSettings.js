var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: chicago
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    directionsDisplay.setMap(map);
    centreOnCurrentLocation();
    
}

function centreOnCurrentLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var currentLocation = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);
            map.setCenter(currentLocation);

        }, function () {
            alert("Error! Something with geo-loaction shit");
        });
    }
    
}

function planRoute(){

}

function calcRouteFromCurrentLocation(destination) {
    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var currentLocation = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);
            calcRoute(currentLocation, destination);
        }, function () {
            alert("Error! Something with geo-loaction shit");
        });
    }
}

function calcRoute(start, destination) {
    var request = {
        origin: start,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
}


function addLocationBox(){
    
//    var listItem = document.createElement('li');
//    listItem.innerHTML = document.createElement("BUTTON");
    $('#InputBoxesList').append('<li><input type="text" /><input type="button" value ="Add Location"  onclick="addLocationBox();"/></li>')
}