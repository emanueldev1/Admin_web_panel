// if document not loaded, show loading screen
$(document).ready(function() {
    // wait 1sec and hide loading screen
    setTimeout(function() {
        $("#loading").fadeOut(500);
    }, 600);
});

// verify is screen resolution is <= 860px
// $(document).ready(function() {
//     if ($(window).width() <= 860) {
//         // reditect to /mobilenot
//         window.location.href = "/movilenot";
//     }
// });