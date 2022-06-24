// if document not loaded, show loading screen
$(document).ready(function() {
    // wait 1sec and hide loading screen
    setTimeout(function() {
        $("#loading").fadeOut(500);
    }, 600);
});

// ob button whith type submit disable this button and change text
$("#submit").click(function(e) {
    
    // insert html in the button 
    $("#submit").html("<span class='spiner'></span>Loading...");
});