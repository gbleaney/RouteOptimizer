function initialize() {
    
    directionsService = new google.maps.DirectionsService()
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
      addLocationBox();
      placesService = new google.maps.places.PlacesService(map);
      
    initUI();

    $(window).resize(
        function () { 
            setSizes(); 
        }
    );
}

function centreOnCurrentLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currentLocation = new google.maps.LatLng(position.coords.latitude,
            position.coords.longitude);
            map.setCenter(currentLocation);

        }, function () {
            alert("Error, could not get geolocation");
        });
    }
    
}