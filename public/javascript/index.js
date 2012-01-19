var tripRequestClickHandler = function (event) {
    var requestee = $("#requestee").val();
    var pick_up = $("#pick_up_address").val();
    var drop_off = $("#drop_off_address").val();
    alert("Request Mapped! Requestee: " + requestee + ", Pick-up: " + pick_up + ", Drop-off: " + drop_off);
    // clear values
    $("#requestee").val("");
    $("#pick_up_address").val("");
    $("#drop_off_address").val("");
};

$(document).ready(function () {
    $('#trip_request').click(tripRequestClickHandler);
});
