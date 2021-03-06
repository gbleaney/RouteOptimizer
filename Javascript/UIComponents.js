
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
'     <input class="locationInput" type="text" onkeyup="checkForEnter(event)" value="' + placeholderText + '" />' + '\n';

function initUI(){
    $("#custom_location").prop("disabled", true);
    $("#use_custom_location").change(function(){
        customLocationCheckboxChanged();
    })
    addLocationBox(false);
    setSizes();

}

function addLocationBox(showAnimation){
    var inputRow = $('<li>'+selectElement+inputBox+removeFieldButton+'</li>');
    inputRow.hide();
    inputRow.insertBefore($('#input_boxes_list').children().last());
    if(showAnimation)
        inputRow.slideDown(200);
    else
        inputRow.show();
    
    //This code could be replaced by the HTML5 "Placeholder" attribute, but this remains here instead for compatibility
    var locationBox = $( '.locationInput','#input_boxes_list:last-child');
    locationBox.on("focusin", function(event){
        var box = $(event.currentTarget);
        if(box.val()==placeholderText){
            box.val("");
            box.css("color", "#000000");
            box.css("font-style", "normal");
        }
        inputChanged();
    });
    locationBox.on("focusout", function(event){
        var box = $(event.currentTarget);
        if(box.val()==""){
            box.val(placeholderText);
            box.css("color", "#CCCCCC");
            box.css("font-style", "italic");
        }
    });
}

function removeLocationBox(button){
    var inputRow = $(button.parentNode);
    inputRow.slideUp(200, function (){
        inputRow.remove();
    })
}

function setSizes(){
    var width = document.body.clientWidth;
    if(width > 400){
        width = 400
    }

    $("#content").width(width);
    $("#map_container").height($("#map_container").innerWidth());
    $("#map_canvas").height($("#map_canvas").innerWidth());
    
    $("#map_container").children('#plan_route_button').width($("#map_canvas").innerWidth());
    $("#map_container").children('#plan_route_button').height($("#map_canvas").innerHeight());
    
    var inputBoxesListItems = $("#input_boxes_list").children();
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
    $('#plan_route_button').show();
}
function hideMapButton(){
    $('#plan_route_button').hide();
}

function checkForEnter(event){
        // look for window.event in case event isn't passed in
        if (typeof event == 'undefined' && window.event) { event = window.event; }
        if (event.keyCode == 13)
        {
            document.getElementById('plan_route_button').click();
        }
}

//Change the autocomplete to the currently focused box
function setAutocompleteBox(inputbox, type){  
    var autocomplete = new google.maps.places.Autocomplete(inputbox);
    autocomplete.bindTo('bounds', map); 
    //Remove google defined placeholder
    $(inputbox).removeAttr('placeholder');
    if(type==null){
        autocomplete.setTypes(type);
    }
}

//Clearing all listeners is only way to remove autocomplete (see bug: http://code.google.com/p/gmaps-api-issues/issues/detail?id=3429)
function clearAutocompleteBox(inputBox){
    google.maps.event.clearListeners(inputBox, "focus");
    google.maps.event.clearListeners(inputBox, "blur");
    google.maps.event.clearListeners(inputBox, "keydown");
}

function selectChange(select){
    var selectedValue = select.options[select.selectedIndex].value.replace('select_','');
    var inputSibling = $(select).siblings(".locationInput")[0];
    clearAutocompleteBox(inputSibling);
    
    if(selectedValue == selectTypes.Address.value){
        setAutocompleteBox(inputSibling, ['geocode'])
    }
    else if(selectedValue == selectTypes.GenericLocation.value){
    }
    else if(selectedValue == selectTypes.Chain.value){
    }
    else if(selectedValue == selectTypes.Item.value){
    }
    
}

function showInstructions(){
    var instructions = $("#instructions");
    var instructionsButton = $("#instructions_button");
    var settingsButton = $("#settings_button");
    
    $("#settings").hide();
    $("#instructions_button_bottom_border").css('border-color','#FFFFFF');
    settingsButton.css('color','#999999');
    settingsButton.css('font-weight','normal');
    
    if(instructions.is(':visible')){
        instructions.hide();
        $("#settings_button_bottom_border").css('border-color','#FFFFFF');
        instructionsButton.css('color','#999999');
        instructionsButton.css('font-weight','normal');
    }else{
        instructions.show();
        $("#settings_button_bottom_border").css('border-color','#CCCCCC');
        instructionsButton.css('font-weight','bold');
        instructionsButton.css('color','#333333');
    }
}

function showSettings(){
    var settings = $("#settings");
    var instructionsButton = $("#instructions_button");
    var settingsButton = $("#settings_button");
    
    $("#instructions").hide();
    $("#settings_button_bottom_border").css('border-color','#FFFFFF');
    instructionsButton.css('color','#999999');
    instructionsButton.css('font-weight','normal');
    
    var settings = $("#settings");
    var instructionsButton = $("#instructions_button");
    var settingsButton = $("#settings_button")
    if(settings.is(':visible')){
        settings.hide();
        $("#instructions_button_bottom_border").css('border-color','#FFFFFF');
        settingsButton.css('color','#999999');
        settingsButton.css('font-weight','normal');
        
    }else{
        settings.show();
        $("#instructions_button_bottom_border").css('border-color','#CCCCCC');
        settingsButton.css('font-weight','bold');
        settingsButton.css('color','#333333');
    }
}

function customLocationCheckboxChanged(){
     if(document.getElementById("use_custom_location").checked){
         $("#custom_location").prop("disabled", false);
     }else{
         $("#custom_location").prop("disabled", true);
     }
}
