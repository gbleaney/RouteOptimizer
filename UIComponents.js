
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
        var newWidth = li.innerWidth();
        
        var selectorOuterWidth = selector.outerWidth();
        var buttonOuterWidth = button.outerWidth();
        var inputLeftPadding = input.css('padding-left');
        var inputRightPadding = input.css('padding-right');
        var liLeftPadding = li.css('padding-left');
        var liRightPadding = li.css('padding-right');
        var padding = parseInt(inputLeftPadding.substring(0, inputLeftPadding.length-2)) + 
                      parseInt(inputRightPadding.substring(0, inputRightPadding.length-2)) + 
                      parseInt(liLeftPadding.substring(0, liLeftPadding.length-2)) + 
                      parseInt(liRightPadding.substring(0, liRightPadding.length-2));
        
        
        newWidth = newWidth - selectorOuterWidth - buttonOuterWidth - padding - 1;
        input.width(newWidth);
    }
    
    google.maps.event.trigger(map, 'resize');
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