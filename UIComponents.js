
var selectElement =
'    <select class="locationTypeSelector" onchange="selectChange(this); inputChanged();">' + '\n' +
'      <option value="select_'+selectTypes.Default.value+'">'+selectTypes.Default.name+'</option>' + '\n' +
'      <option value="select_'+selectTypes.Address.value+'">'+selectTypes.Address.name+'</option>' + '\n' +
'      <option value="select_'+selectTypes.GenericLocation.value+'">'+selectTypes.GenericLocation.name+'</option>' + '\n' +
'      <option value="select_'+selectTypes.Chain.value+'">'+selectTypes.Chain.name+'</option>' + '\n' +
'      <option value="select_'+selectTypes.Item.value+'">'+selectTypes.Item.name+'</option>' + '\n' +
'    </select> ' + '\n';

var removeFieldButton =
'    <input class="removeFieldButton" type="button" value="X" onclick="removeLocationBox(this);"/>' + '\n';

var placeholderText = 'Enter something...';

var inputBox = 
'     <input class="locationInput" type="text" value="' + placeholderText + '" />' + '\n';

function addLocationBox(){
    $('<li>'+selectElement+inputBox+removeFieldButton+'</li>').insertBefore($('#InputBoxesList').children().last());
    
    //This code could be replaced by the HTML5 "Placeholder" attribute, but this remains here instead for compatibility
    var locationBox = $( '.locationInput','#InputBoxesList:last-child');
    locationBox.on("focusin", function(event){
        var box = $(event.currentTarget);
        if(box.val()==placeholderText){
            box.val("");
            box.css("color", "#000000");
            box.css("font", "normal");
        }
        inputChanged();
    });
    locationBox.on("focusout", function(event){
        var box = $(event.currentTarget);
        if(box.val()==""){
            box.val(placeholderText);
            box.css("color", "#CCCCCC");
            box.css("font", "italic");
        }
    });
    //locationBox.width(locationBox.width()-50)
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
    
    $("#map_container").children('#PlanRoute').width($("#map_canvas").innerWidth());
    $("#map_container").children('#PlanRoute').height($("#map_canvas").innerHeight());
    
    var inputBoxesListItems = $("#InputBoxesList").children();
    for( var i=0; i < inputBoxesListItems.length-1; i++){
        var li = $(inputBoxesListItems[i]);
        var selector = $(li.children('.locationTypeSelector')[0]);
        var input = $(li.children('.locationInput')[0]);
        var button = $(li.children('.removeFieldButton')[0]);
        var newWidth = li.outerWidth();
        
        var selectorPaddingAndMargins = getPaddingAndMargins(selector);
        var buttonPaddingAndMargins = getPaddingAndMargins(button);
        var inputPaddingAndMargins = getPaddingAndMargins(input);
        var liPaddingAndMargins = getPaddingAndMargins(li);
        var paddingAndMargins = selectorPaddingAndMargins + buttonPaddingAndMargins + inputPaddingAndMargins + liPaddingAndMargins
        
        
        newWidth = newWidth - selector.outerWidth() - button.outerWidth() - paddingAndMargins;
        input.width(newWidth);
    }
    
    google.maps.event.trigger(map, 'resize');
}

function getPaddingAndMargins(element){
    var elementLeftPadding = element.css('padding-left');
    elementLeftPadding = parseInt(elementLeftPadding.substring(0, elementLeftPadding.length-2));
    
    var elementRightPadding = element.css('padding-right');
    elementRightPadding = parseInt(elementRightPadding.substring(0, elementRightPadding.length-2));
    
    var elementLeftMargin = element.css('margin-left');
    elementLeftMargin = parseInt(elementLeftMargin.substring(0, elementLeftMargin.length-2));
    
    var elementRightMargin = element.css('margin-right');
    elementRightMargin = parseInt(elementRightMargin.substring(0, elementRightMargin.length-2));
    
    var totalPaddingAndMargin = elementLeftPadding + elementRightPadding + elementLeftMargin + elementRightMargin;
    
    return totalPaddingAndMargin;
}

function inputChanged(){
    $("#map_container").children('#PlanRoute').show();
}
function hideMapButton(){
    $("#map_container").children('#PlanRoute').hide();
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