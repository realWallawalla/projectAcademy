var coords = {};


function getLocation() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showLocation);
    }

    else {
        alert("Sorry, browser does not support geolocation!");
    }
}

function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    coords = {
        lat: latitude,
        lng: longitude
    };
}

window.onload = function () {
    getLocation();
}

function initializeAutocomplete() {

    var input = document.getElementById('locationTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initializeAutocomplete);


//debugger timout
// setTimeout(function () {
//     console.log(coords.lat);
// }, 3000);

var container = document.getElementById('blubb');
var service = new google.maps.places.PlacesService(container);

document.getElementById("geoButton").onclick = function fun() {
    var request = {
        location: new google.maps.LatLng(coords.lat, coords.lng),
        radius: '500',
        types: ['bar']
    };

    service.nearbySearch(request, callback);

    function callback(results, status) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {
            $.ajax({
                url: "/GET",
                type: 'GET',
                success: function (response) {
                    console.log(response);
                }
            });


            for (var i = 0; i < results.length; i++) {
                var imageUrl = "" + results[i].photos[0].getUrl({'maxWidth': 10000, 'maxHeight': 10000});
                var placeId = "" + results[i].place_id;
                var placeIdUrl = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=AIzaSyDD5X7i5BOI8Uz0cn0uAhByxD_ix-O_jsw";


                // console.log(placeIdUrl);



                $('.barResultContainer').append('<div class="barResult" id=barResult' + i + '></div>');
                $('#barResult' + i).append('<div class="barResultTitle" id=barResultTitle' + i + '></div>');
                $('#barResult' + i).append('<div class="rating" id=rating' + i + '></div>');
                $('#barResult' + i).append('<div class="searchImage" id=searchImage' + i + '></div>');
                $('#barResult' + i).append('<img src="" class="searchImageUrl" id=searchImageUrl' + i + '></img>');
                $('#barResult' + i).append('<div class="address" id=address' + i + '></div>');


                $('#barResultTitle' + i).append(results[i].name);
                $('#rating' + i).append(results[i].rating);
                $("#searchImageUrl" + i).attr("src", imageUrl);
                $('#address' + i).append(results[i].vicinity);



            }

        }

    }
}
