var coords = {};
var autoLat, autoLong;
var tempRequest;
var autoSearch = false;
var match = false;
var beerPrice, winePrice, ciderPrice;
// $("#searchButton").click(function location(){
//     var userSearch = $("#locationTextField").val().longitude;
//     var userSearch2 = $("#locationTextField").val().altitude;
//     console.log("longi: " + userSearch);
//     console.log("alti: " +userSearch2);
// });


$(document).ready(function () {
    $("#slider").slider({
        range: "min",
        animate: true,
        value: 1,
        min: 0,
        max: 2500,
        step: 50,
        slide: function (event, ui) {
            update(1, ui.value); //changed
        }
    });

    //Added, set initial value.
    $("#amount").val(0);
    $("#amount-label").text(0);


    update();
});

//changed. now with parameter
function update(slider, val) {
    //changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
    var $amount = slider == 1 ? val : $("#amount").val();

    /* commented
     $amount = $( "#slider" ).slider( "value" );
     $duration = $( "#slider2" ).slider( "value" );
     */

    $("#amount").val($amount);
    $("#amount-label").text($amount);

    $('#slider a').html('<label>' + $amount + '</label><div class="ui-slider-label-inner"></div>');
}
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

    var address = (document.getElementById('locationTextField'));
    var autocomplete = new google.maps.places.Autocomplete(address);
    autocomplete.setTypes(['geocode']);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    });
}

$("#searchButton").click(function codeAddress() {
    autoSearch = true;
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById("locationTextField").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            autoLat =results[0].geometry.location.lat();
            autoLong =results[0].geometry.location.lng();
            console.log(autoLat);
            fun(setRequest());
        }

        else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
});





$("#geoButton").click(function(){
   fun(setRequest());
});
google.maps.event.addDomListener(window, 'load', initializeAutocomplete);


//debugger timout
// setTimeout(function () {
//     console.log(coords.lat);
// }, 3000);

var container = document.getElementById('blubb');
var service = new google.maps.places.PlacesService(container);

function setRequest(){
    if(autoSearch) {
        tempRequest = {
            location: new google.maps.LatLng(autoLat, autoLong),
            radius: '500',
            types: ['bar', 'pub']
        };
        return tempRequest;
    }else{
        var tempRequest = {
            location: new google.maps.LatLng(coords.lat, coords.lng),
            radius: '500',
            types: ['bar', 'pub']
        };
        return tempRequest;
    }
}

function fun(tempRequest) {

    var request = tempRequest;
    service.nearbySearch(request, callback);

    function callback(results, status) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var localBarDatabase;

            $.ajax({
                url: "/GET",
                type: 'GET',
                async: false,
                success: function (response) {
                    console.log(response);
                    localBarDatabase = response;
                    console.log("localBarDatabase");
                    console.log(localBarDatabase);
                }
            });


            $("#barResultContainer").html('');

            //todo
            //change rating to priceBeer later when we have prices for it.
            results.sort(function(a, b) {
                return parseFloat(b.rating) - parseFloat(a.rating);
            });
            for (var i = 0; i < results.length; i++) { //results.length

                var d = new Date();
                var openingHours = [];
                // if(results[i].photos.length >= 0) {
                //  var imageUrl = "" + results[i].photos[1].getUrl({'maxWidth': 750, 'maxHeight': 750});
                // } else {
                //    //var imageUrl = "beerPic.jpg"
                //     console.log("length = 0 or minus")
                // }
                // console.log(imageUrl);
                var placeId = "" + results[i].place_id;
                var placeIdUrl = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=AIzaSyDD5X7i5BOI8Uz0cn0uAhByxD_ix-O_jsw";

                //console.log(placeIdUrl);

                $.ajax({
                    url: placeIdUrl,
                    type: 'GET',
                    async: false,
                    success: function (response) {
                       try {
                           if (typeof response.result.opening_hours !== 'undefined' && typeof response.result.opening_hours.weekday_text !== 'undefined') {
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
                       }catch(err){}
                       try {
                           if (results[i].photos.length > 0) {
                               var imageUrl = "" + results[i].photos[0].getUrl({'maxWidth': 750, 'maxHeight': 750});
                           }
                       }catch(err){
                           imageUrl = "beerPic.jpg"
                       }
                        console.log(imageUrl);

                        $('#barResultContainer').append('<article class="barResult" id=barResult' + i + '></article>');
                        $('#barResult' + i).append('<section class="col-xs-12 col-sm-6 col-md-12" id=sectionResult' + i + '>');
                        $('#sectionResult' + i).append('<div class="row" id=rowId' + i + '></div>');
                        $('#rowId' + i).append('<div class="col-md-7" id=pictCol' + i + '></div>');
                        $('#pictCol' + i).append('<a class="alink" id=alink' + i + '></a>');
                        $('#alink' + i).append('<img src="" class="img-fluid mb-3 mb-md-0" id=searchImageUrl' + i + '></img>');

                        $('#rowId' + i).append('<div class="col-md-5" id=textCol' + i + '></div>');
                        $('#textCol' + i).append('<h3 class="barResultTitle" id=barResultTitle' + i + '></h3>');
                        $('#textCol' + i).append('<p class="description" id=description' + i + '></p>');
                        $('#textCol' + i).append('<p class="marker" id=marker' + i + '></p>');
                        $('#marker' + i).append('<i class="glyphicon glyphicon-map-marker"></i>');
                        $('#marker' + i).append('<span class="address" id=address' + i + '></span>');

                        $('#textCol' + i).append('<p class="markerBeer" id=markerBeer' + i + '></p>');
                        $('#markerBeer' + i).append('<i class="glyphicon glyphicon-glass"></i>');
                        $('#markerBeer' + i).append('<span class="beerPrice" id=beerPrice' + i + '></span>');


                        $('#textCol' + i).append('<p class="markerWine" id=markerWine' + i + '></p>');
                        $('#markerWine' + i).append('<i class="glyphicon glyphicon-glass"></i>');
                        $('#markerWine' + i).append('<span class="winePrice" id=winePrice' + i + '></span>');


                        $('#textCol' + i).append('<p class="markerCider" id=markerCider' + i + '></p>');
                        $('#markerCider' + i).append('<i class="glyphicon glyphicon-glass"></i>');
                        $('#markerCider' + i).append('<span class="ciderPrice" id=ciderPrice' + i + '></span>');

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



                        $('#textCol' + i).append('<p class="barResultTitle" id=barResultTitle' + i + '></p>');
                        $('#textCol' + i).append('<div class="rating" id=rating' + i + '></div>');
                        $('#textCol' + i).append('<div class="searchImage" id=searchImage' + i + '></div>');
                        $('#textCol' + i).append('<div class="address" id=address' + i + '></div>');

                        $('#barResultTitle' + i).append(results[i].name);
                        // $('#rating' + i).append(results[i].rating);
                        $("#searchImageUrl" + i).attr("src", imageUrl);


                        $('#address' + i).append(" " + results[i].vicinity);

                        // $('#description' + i).append("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate.");
                        //$('#beerPrice' + i).append("Beer from: 35");
                        $('#openHours' + i).append(" " + openingHours[((d.getDay() + 6) % 7)]);
                        $('#wifiAvailable' + i).append(" Free wi-fi: Available");
                        $('#ratingStar' + i).append(" Rating: " + results[i].rating);
                        $('#wiewInfoText' + i).append(" erkgnerklögneörklgnklerngjklerngjkerngjkerngjkern");
                        $('#wiewInfoWine1' + i).append(" Wine from: 780");
                        $('#wiewInfoWine2' + i).append(" Cider from: lul");

                        for (var j = 0; j < localBarDatabase.length; j++) {
                            if (localBarDatabase[j].adress == results[i].vicinity && localBarDatabase[j].barName == results[i].name) {
                                console.log("local: " + localBarDatabase[j].barName);
                                console.log("google: " + results[i].name);
                                beerPrice = localBarDatabase[j].priceBeer;
                                winePrice = localBarDatabase[j].priceWine;
                                ciderPrice = localBarDatabase[j].priceCider;
                                match = true;
                                continue;
                            }
                        }
                        if(match){
                            $('#beerPrice' + i).append(" Beer from: " + beerPrice);
                            $('#winePrice' + i).append(" Wine from: " +winePrice);
                            $('#ciderPrice' + i).append(" Cider from: " + ciderPrice);
                            match = false;
                        }else{
                            $('#beerPrice' + i).append(" Beer from: Not specified");
                            $('#winePrice' + i).append(" Wine from: Not specified");
                            $('#ciderPrice' + i).append(" Cider from: Not specified");
                        }
                        autoSearch = false;
                    }

                });
               console.log(results);

            }
        }
    }
}
