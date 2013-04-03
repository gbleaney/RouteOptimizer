var map;
var directionsDisplay;
var directionsService;
var size;
var placesService;
var currentLocation;

//Define the options availible for the select list
var selectTypes = {
    Default : {
        value: -1, 
        name: "Choose Option", 
        code: "CO"
    }, 
    Address : {
        value: 0, 
        name: "Address", 
        code: "A"
    }, 
    GenericLocation: {
        value: 1, 
        name: "Generic Location", 
        code: "GL"
    }, 
    Chain : {
        value: 2, 
        name: "Chain", 
        code: "C"
    },
    Item : {
        value: 3, 
        name: "Item", 
        code: "I"
    }
}

