var tripRequestClickHandler = function (event) {
    var requestee = $("#requestee").val();
    var pick_up = $("#pick_up_address").val();
    var drop_off = $("#drop_off_address").val();
    var pick_up_time = new Date().getTime();
    alert("Request Mapped! Requestee: " + requestee + ", Pick-up: " + pick_up + " at "+ pick_up_time +", Drop-off: " + drop_off);
    // clear values
    $("#requestee").val("");
    $("#pick_up_address").val("");
    $("#drop_off_address").val("");
};

$(document).ready(function () {
    $('#trip_request').click(tripRequestClickHandler);
});
