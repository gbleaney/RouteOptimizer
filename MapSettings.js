var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var size;
var map;
var placesService;
var currentLocation;
var selectTypes = {
    Address : {value: 0, name: "Address", code: "A"}, 
    GenericLocation: {value: 1, name: "Generic Location", code: "GL"}, 
    Chain : {value: 2, name: "Chain", code: "C"},
    Item : {value: 3, name: "Item", code: "I"}
}
var selectElement =
'    <select class="locationTypeSelector" onchange="selectChange(this)">' + '\n' +
'      <option value="select_'+selectTypes.Address.value+'">'+selectTypes.Address.name+'</option>' + '\n' +
'      <option value="select_'+selectTypes.GenericLocation.value+'">'+selectTypes.GenericLocation.name+'</option>' + '\n' +
'      <option value="select_'+selectTypes.Chain.value+'">'+selectTypes.Chain.name+'</option>' + '\n' +
'      <option value="select_'+selectTypes.Item.value+'">'+selectTypes.Item.name+'</option>' + '\n' +
'    </select> ' + '\n';

var removeFieldButton =
'    <input class="removeFieldButton" type="button" value="Remove" onclick="removeField(this);"/>' + '\n';

var inputBox = 
'    <input class="locationInput" type="text" />' + '\n';

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
    addLocationBox();
    placesService = new google.maps.places.PlacesService(map);
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

function resizeMap(){
    google.maps.event.trigger(map, 'resize');
}

function planRoute(){
    var destinations = parseDestinations();
    calcRouteFromCurrentLocation(destinations);
}

function calcRouteFromCurrentLocation(destinations) {
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

function parseDestinations(){
    var listItems = $('#InputBoxesList').children();
    var destinations = [];
    for(var i=0; i< listItems.length;i++){
        var selector = $(listItems[i]).children('.locationTypeSelector')[0];
        var locationInputBox = $(listItems[i]).children('.locationInput')[0];
        var selectedValue = selector.options[selector.selectedIndex].value.replace('select_','');
    
        if(selectedValue == selectTypes.Address.value){
            destinations.push({
                location: locationInputBox.value,
                stopover: true
            });
        }
        else if(selectedValue == selectTypes.GenericLocation.value){
            var type = [];
            type.push(locationInputBox.value);
            var request = {
                location: currentLocation,
                radius: 50000,
                types: type
            };
            placesService.nearbySearch(request, function(results, status){
                alert(results.value);
            });
        }
        else if(selectedValue == selectTypes.Chain.value){
            alert('Searching by Chain not supported yet');
        }
        else if(selectedValue == selectTypes.Item.value){
            alert('Searching by Item not supported yet');
        }
        
    }
    return destinations;
}


function addLocationBox(){
    
//    var listItem = document.createElement('li');
//    listItem.innerHTML = document.createElement("BUTTON");
    $('#InputBoxesList').append('<li>Search by: '+selectElement+inputBox+removeFieldButton+'</li>');
}

function selectChange(select){
    var selectedValue = select.options[select.selectedIndex].value.replace('select_','');
    
    if(selectedValue == selectTypes.Address.value){
    }
    else if(selectedValue == selectTypes.GenericLocation.value){
    }
    else if(selectedValue == selectTypes.Chain.value){
        //alert('Searching by Chain not supported yet');
    }
    else if(selectedValue == selectTypes.Item.value){
        //alert('Searching by Item not supported yet');
    }
    
}

function removeField(button){
    $(button.parentNode).remove();
}