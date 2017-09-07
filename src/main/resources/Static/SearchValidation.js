/**
 * Created by Administrator on 2017-09-04.
 */

$(document).ready(function () {
    //validate info after btn is clicked
    $("#searchmember").click(function () {
        //todo
        //check if box is empty
        var input = $("#member");
        if (input.val().length > 0) {
            //make sql call and forward user
            return true;
        }
        else {
            //todo
            //change this later!
            alert("Please enter a valid data in the textbox");
            return false;
        }

    });


});
