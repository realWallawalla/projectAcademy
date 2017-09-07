var coords = {};

function getLocation(){
    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(showLocation);
         }

    else{
       alert("Sorry, browser does not support geolocation!");
    }
}

function showLocation(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            coords = {lat: latitude,
                      lng: longitude};
         }

window.onload = function() {
  getLocation();
}

//debugger timout
setTimeout(function(){console.log(coords.lat);}, 3000);

var container = document.getElementById('blubb');
var service = new google.maps.places.PlacesService(container);

    document.getElementById("geoButton").onclick = function fun() {
      var result = [];
      var request = {
          location: new google.maps.LatLng(coords.lat, coords.lng),
          radius: '500',
          types: ['bar']
      };

      service.nearbySearch(request, callback);

      function callback(results, status) {

          if (status == google.maps.places.PlacesServiceStatus.OK) {

              for(var i = 0; i < results.length; i++){
                      $('.barResultContainer').append('<div class="barResult" id=barResult' + i + '></div>');
                      $('#barResult' + i).append('<div class="barResultTitle" id=barResultTitle' + i + '></div>');
                      $('#barResult' + i).append('<div class="rating" id=rating' + i + '></div>');
                      $('#barResultTitle' + i).append(results[i].name);
                      $('#rating' + i).append(results[i].rating);
              }
          }

      }
    }
