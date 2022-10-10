// ASSIGNMENT CODE
var targetCity = 'New York City';
var googleKey = 'AIzaSyDh2jcs3sWSy_5L5y-hdC0bryjDAjOEZTg';
var weatherKey = '66b15a5b3951d15de56c5d2c4e2ddcba';
var inputEl = document.getElementById('autocomplete')


// DEPENDENCIES
var autocomplete;


// FUNCTIONS
function getLatLon(city) {
  var geoURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + weatherKey;
  fetch(geoURL).then(response => {
    return response.json()
  }).then(data => {
    console.log(data);
  }) 
}

// function initAutocomplete() {
  // }
  
  function initGoogle() {
    var newYorkLatLon = { lat: 40.7127281, lng: -74.0060152   }
    var options = {
      zoom: 11,
      center: newYorkLatLon
    }
    // New map
    var map = new google.maps.Map(document.getElementById("map"), options);
    
    // Add marker
    var marker = new google.maps.Marker({
      position: newYorkLatLon,
      map: map
    });
    
    // Add info window for marker
    var infoWindow = new google.maps.InfoWindow({
      content: '<h1>User</h1>'
    }); 
    
    // Add event listener to marker
    marker.addListener('click', function(){
      infoWindow.open(map, marker);
  });
  
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    {
      componentRestrictions: {'country': ['us']},
      fields: ['geometry', 'name'],
      types: ['establishment'] // types: ['restaurant', 'cafe'],
    });
    
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      new google.maps.Marker({
        position: place.geometry.location,
        title: place.name,
        map: map
      });
    });
  }
  
  getLatLon(targetCity);