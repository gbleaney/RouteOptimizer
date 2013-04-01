
var selectElement =
'    <select class="locationTypeSelector" onchange="selectChange(this)">' + '\n' +
'      <option value="select_'+selectTypes.Address.value+'">'+selectTypes.Address.name+'</option>' + '\n' +
'      <option value="select_'+selectTypes.GenericLocation.value+'">'+selectTypes.GenericLocation.name+'</option>' + '\n' +
'      <option value="select_'+selectTypes.Chain.value+'">'+selectTypes.Chain.name+'</option>' + '\n' +
'      <option value="select_'+selectTypes.Item.value+'">'+selectTypes.Item.name+'</option>' + '\n' +
'    </select> ' + '\n';

var removeFieldButton =
'    <input class="removeFieldButton" type="button" value="Remove" onclick="removeLocationBox(this);"/>' + '\n';

var placeholderText = 'Enter something...';

var inputBox = 
'    <input class="locationInput empty" type="text" value="' + placeholderText + '" />' + '\n';

function addLocationBox(){
    var newBox = '<li>'+selectElement+inputBox+removeFieldButton+'</li>';
    
    
    $('#InputBoxesList').append(newBox);
    
    //This code could be replaced by the HTML5 "Placeholder" attribute, but this remains here instead for compatibility
    $( '.locationInput','#InputBoxesList:last-child').on("focusin", function(event){
        var box = $(event.currentTarget);
        if(box.val()==placeholderText){
            box.val("");
            box.css("color", "#000000");
            box.css("font", "normal");
        }
    });
    $( '.locationInput','#InputBoxesList:last-child').on("focusout", function(event){
        var box = $(event.currentTarget);
        if(box.val()==""){
            box.val(placeholderText);
            box.css("color", "#CCCCCC");
            box.css("font", "italic");
        }
    });
}

function removeLocationBox(button){
    $(button.parentNode).remove();
}

function setSizes(){
    var width = document.body.clientWidth;
    if(width > 400){
        width = 400
    }

    $("#content").width(width);
    $("#map_container").height($("#map_container").innerWidth());
    $("#map_canvas").height($("#map_canvas").innerWidth());
    
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