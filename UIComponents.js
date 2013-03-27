
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
    $('#InputBoxesList').append('<li>Search by: '+selectElement+inputBox+removeFieldButton+'</li>');
}

function removeLocationBox(button){
    $(button.parentNode).remove();
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