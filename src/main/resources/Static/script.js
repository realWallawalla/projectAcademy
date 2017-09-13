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
                async: false,
                success: function (response) {
                    console.log(response);
                }
            });


            for (var i = 0; i < 2; i++) { //results.length

                var d = new Date();
                var openingHours = [];
                if(results[i].photos.length > 0) {
                   var imageUrl = "" + results[i].photos[0].getUrl({'maxWidth': 750, 'maxHeight': 750});
                } else {
                   var imageUrl = "beerPic.jpg"
                }
                console.log(imageUrl);
                var placeId = "" + results[i].place_id;
                var placeIdUrl = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=AIzaSyDD5X7i5BOI8Uz0cn0uAhByxD_ix-O_jsw";

                //console.log(placeIdUrl);

                $.ajax({
                    url: placeIdUrl,
                    type: 'GET',
                    async: false,
                    success: function (response) {
                        if(typeof response.result.opening_hours !== 'undefined' && typeof response.result.opening_hours.weekday_text !== 'undefined') {
                            openingHours = response.result.opening_hours.weekday_text;
                        } else {
                            openingHours = ["Not specified",
                                            "Not specified",
                                            "Not specified",
                                            "Not specified",
                                            "Not specified",
                                            "Not specified",
                                            "Not specified"]
                        }
                    }
                });


                $('#barResultContainer').append('<article class="barResult" id=barResult' + i + '></article>');
                $('#barResult' + i).append('<section class="col-xs-12 col-sm-6 col-md-12" id=sectionResult' + i + '>');
                $('#sectionResult' + i).append('<div class="row" id=rowId' + i + '></div>');
                $('#rowId' + i).append('<div class="col-md-7" id=pictCol' + i + '></div>');
                $('#pictCol' + i).append('<a class="alink" id=alink' + i + '></a>');
                $('#alink' + i).append('<img src="" class="img-fluid rounded mb-3 mb-md-0" id=searchImageUrl' + i + '></img>');

                $('#rowId' + i).append('<div class="col-md-5" id=textCol' + i + '></div>');
                $('#textCol' + i).append('<h3 class="barResultTitle" id=barResultTitle' + i + '></h3>');
                $('#textCol' + i).append('<p class="description" id=description' + i + '></p>');
                $('#textCol' + i).append('<p class="marker" id=marker' + i + '></p>');
                $('#marker' + i).append('<i class="glyphicon glyphicon-map-marker"></i>');
                $('#marker' + i).append('<span class="address" id=address' + i + '></span>');

                $('#textCol' + i).append('<p class="markerBeer" id=markerBeer' + i + '></p>');
                $('#markerBeer' + i).append('<i class="glyphicon glyphicon-usd"></i>');
                $('#markerBeer' + i).append('<span class="beerPrice" id=beerPrice' + i + '></span>');

                $('#textCol' + i).append('<p class="openMarker" id=openMarker' + i + '></p>');
                $('#openMarker' + i).append('<i class="glyphicon glyphicon-time"></i>');
                $('#openMarker' + i).append('<span class="openHours" id=openHours' + i + '></span>');

                $('#textCol' + i).append('<p class="wifi" id=wifi' + i + '></p>');
                $('#wifi' + i).append('<i class="glyphicon glyphicon-signal"></i>');
                $('#wifi' + i).append('<span class="wifiAvailable" id=wifiAvailable' + i + '></span>');

                $('#textCol' + i).append('<p class="rating" id=rating' + i + '></p>');
                $('#rating' + i).append('<i class="glyphicon glyphicon-star"></i>');
                $('#rating' + i).append('<span class="ratingStar" id=ratingStar' + i + '></span>');

                $('#textCol' + i).append('<button class="btn btn-primary" data-toggle="collapse" data-target=#demo2' + i + ' id=wiewInfoBtn' + i + '>View more info</button>');
                $('#textCol' + i).append('<div class="collapse" id=demo2' + i + '></div>');
                $('#demo2' + i).append('<p id=wiewInfoText' + i + '></p>');
                $('#demo2' + i).append('<p id=wiewInfoWine' + i + '></p>');
                $('#viewInfoWine' + i).append('<i class="glyphicon glyphicon-usd" id=wiewInfoWine1' + i + '></i>');
                $('#viewInfoWine' + i).append('<span id=wiewInfoWine2' + i + '></span>');
                $('#viewInfo' + i).append('<p class="collapse" id=wiewInfoCider' + i + '></p>');

                $('#textCol' + i).append('<button class="btn btn-primary" data-target="#demo" id=favBtn' + i + '>Add to favourites</button>');


                $('#textCol' + i).append('<p class="barResultTitle" id=barResultTitle' + i + '></p>');
                $('#textCol' + i).append('<div class="rating" id=rating' + i + '></div>');
                $('#textCol' + i).append('<div class="searchImage" id=searchImage' + i + '></div>');
                $('#textCol' + i).append('<div class="address" id=address' + i + '></div>');

                $('#barResultTitle' + i).append(results[i].name);
                // $('#rating' + i).append(results[i].rating);
                $("#searchImageUrl" + i).attr("src", imageUrl);
                $('#address' + i).append(results[i].vicinity);

                // $('#description' + i).append("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate.");
                $('#beerPrice' + i).append("Beer from: 35");
                $('#openHours' + i).append(" " + openingHours[((d.getDay() + 6)%7)]);
                $('#wifiAvailable' + i).append(" Free wi-fi: Avalaible");
                $('#ratingStar' + i).append("Rating: " + results[i].rating);
                $('#wiewInfoText' + i).append(" erkgnerklögneörklgnklerngjklerngjkerngjkerngjkern");
                $('#wiewInfoWine1' + i).append(" Wine: 780");
                $('#wiewInfoWine2' + i).append(" Cider: lul");


            }
        }
    }
}
