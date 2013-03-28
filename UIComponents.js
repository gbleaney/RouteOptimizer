
var selectElement =
    '    <select class="locationTypeSelector" onchange="selectChange(this)">' + '\n' +
    '      <option value="select_'+selectTypes.Address.value+'">'+selectTypes.Address.name+'</option>' + '\n' +
    '      <option value="select_'+selectTypes.GenericLocation.value+'">'+selectTypes.GenericLocation.name+'</option>' + '\n' +
    '      <option value="select_'+selectTypes.Chain.value+'">'+selectTypes.Chain.name+'</option>' + '\n' +
    '      <option value="select_'+selectTypes.Item.value+'">'+selectTypes.Item.name+'</option>' + '\n' +
    '    </select> ' + '\n';

var removeFieldButton =
    '    <input class="removeFieldButton" type="button" value="Remove" onclick="removeLocationBox(this);"/>' + '\n';

var inputBox = 
    '    <input class="locationInput" type="text" />' + '\n';

function addLocationBox(){
    $('#InputBoxesList').append('<li>'+selectElement+inputBox+removeFieldButton+'</li>');
}

function removeLocationBox(button){
    $(button.parentNode).remove();
}

function setSizes(){
    var mapDimensions;
    var width = window.innerWidth;
    if(width > 420){
        mapDimensions = 400
    }
    else {
        mapDimensions = width-20;
    }
    $("#map_container").width(mapDimensions);
    $("#map_canvas").width(mapDimensions);
    $("#content").width(mapDimensions);
    $("#map_container").height(mapDimensions);
    $("#map_canvas").height(mapDimensions);
    
    google.maps.event.trigger(map, 'resize');
}

//Unimplemented functionality
function selectChange(select){
    var selectedValue = select.options[select.selectedIndex].value.replace('select_','');
    
    if(selectedValue == selectTypes.Address.value){
    }
    else if(selectedValue == selectTypes.GenericLocation.value){
    }
    else if(selectedValue == selectTypes.Chain.value){
    }
    else if(selectedValue == selectTypes.Item.value){
    }
    
}