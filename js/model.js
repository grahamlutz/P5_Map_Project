var places = function () {
  var map;
  this.starterLocations = [
    {
      name: "gym",
      position: {lat: 34.002879, lng: -84.144638},
      lat: "33.754341",
      lang: "-84.381287",
      map: map,
      title: "Lifetime Fitness",
      hashtag: "lifetimefitness",
      city: "Duluth",
      label: "A"
    },
    {
      name: "college",
      position: {lat: 33.754341, lng: -84.381287},
      lat: "33.754341",
      lang: "-84.381287",
      map: map,
      title: "Georgia State University",
      hashtag: "GSU",
      city: "Atlanta",
      label: "B"
    },
    {
      name: "highSchool",
      position: {lat: 33.900803, lng: -84.134659},
      lat: "33.900803",
      lang: "-84.134659",
      map: map,
      title: "Providence Christian Academy",
      hashtag: "providencechristianacademy",
      city: "Lilburn",
      label: "C"
    },
    {
      name: "eastLake",
      position: {lat: 33.743521, lng: -84.302776},
      lat: "33.743521",
      lang: "-84.302776",
      map: map,
      title: "East Lake Golf Club",
      hashtag: "eastlakegolfclub",
      city: "Atlanta",
      label: "D"
    },
    {
      name: "formulaCrossFit",
      position: {lat: 33.938575, lng: -84.236546},
      lat: "33.938575",
      lang: "-84.236546",
      map: map,
      title: "Formula CrossFit",
      hashtag: "formulacrossfit",
      city: "Norcross",
      label: "E"
    }
  ];

  this.placeMarkers = [];

  this.mapOptions = {
    center: {lat: 33.754341, lng: -84.381287},
    zoom: 10
  };

  this.infoWindow = new google.maps.InfoWindow();
};

//Initialize and show new google map via API
places.prototype.initMap = function() {
  this.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);
}
//initialize markers via loop through starterLocations
places.prototype.initMarkers = function() {
  for (var i = 0, len = this.starterLocations.length; i < len; i++) {
    var marker = new google.maps.Marker(this.starterLocations[i]);
    this.placeMarkers.push(marker);
  }
  console.log(this.placeMarkers);
}

var myPlaces = new places ();
myPlaces.initMap();
myPlaces.initMarkers();











