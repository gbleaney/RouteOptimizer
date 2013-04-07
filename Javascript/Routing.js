function planRoute(){
    hideMapButton();
    if(checkCurrentLocation()){
        parseDestinations();
    }
}

function parseDestinations(){
    var listItems = $('#InputBoxesList').children();
    var destinations = new Array();
    
    for(var i=0; i< listItems.length - 1;i++){
        var selector = $(listItems[i]).children('.locationTypeSelector')[0];
        var locationInputBox = $(listItems[i]).children('.locationInput')[0];
        var selectedValue = selector.options[selector.selectedIndex].value.replace('select_','');
        selectedValue = parseInt(selectedValue)
        var inputValue = locationInputBox.value;
        
        var placesCallback = function(results, status){
            if (status == google.maps.places.PlacesServiceStatus.OK) {

                var destination = {
                    location: results[0].geometry.location,
                    stopover: true
                }
                destinations.push(destination);

            }else{
                alert('Error parsing location. Response code: '+status);
                destinations.push(null);
            }
                    
            if(listItems.length-1 == destinations.length){
                calcRouteFromCurrentLocation(destinations);
            }
        }
        
        switch (selectedValue) {
            case selectTypes.Default.value:
                destinations.push(null);
                break;
            case selectTypes.Address.value:
                destinations.push({
                    location: inputValue,
                    stopover: true
                });
                break;
                
            case selectTypes.GenericLocation.value:
                var type = new Array();
                type.push(inputValue);
                var genericRequest = {
                    location: currentLocation,
                    types: [inputValue],
                    rankBy: google.maps.places.RankBy.DISTANCE 
                };
                
                placesService.nearbySearch(genericRequest, placesCallback);
                break;
                
            case selectTypes.Chain.value:
                var chainRequest = {
                    location: currentLocation,
                    //Quotes are required to circumvent bug in API https://code.google.com/p/gmaps-api-issues/issues/detail?id=4792
                    name: "\"" + [inputValue] + "\"",
                    rankBy: google.maps.places.RankBy.DISTANCE 
                };
                
                placesService.nearbySearch(chainRequest, placesCallback); 
                break;
                
            case selectTypes.Item.value:
                var itemRequest = {
                    location: currentLocation,
                    keyword: [inputValue],
                    rankBy: google.maps.places.RankBy.DISTANCE 
                };
                
                placesService.nearbySearch(itemRequest, placesCallback);
                break;
                
            default:
                alert("Error! Select value \""+selectedValue+"\" is not recognized");
        }
    }
    if(listItems.length-1 == destinations.length){
        calcRouteFromCurrentLocation(destinations);
    }
}


function calcRouteFromCurrentLocation(destinations) {
    
    destinations = destinations.filter(function(val) {
        return val !== null;
    });
    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var currentLocation = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);
            calcRoute(currentLocation, destinations);
        }, function () {
            alert("Error, could not get geolocation");
        });
    }
}

function calcRoute(start, destinations) {
    var request = {
        origin: start,
        destination: start,
        waypoints: destinations,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
}

function checkCurrentLocation(){
    if(currentLocation==null){
        alert('Warning! No location set for current location.');
        return false;
    }
    else{
        return true;
    }
}
