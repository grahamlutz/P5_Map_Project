var places = function () {
  var map;
  this.starterLocations = [
    {
      name: "homeSweetHome",
      position: {lat: 33.974559, lng: -84.237619},
      map: map,
      title: "Childhood Home",
      label: "A"
    },
    {
      name: "college",
      position: {lat: 33.754341, lng: -84.381287},
      lat: "33.754341",
      lang: "-84.381287",
      map: map,
      title: "Georgia State University",
      label: "B"
    },
    {
      name: "highSchool",
      position: {lat: 33.900803, lng: -84.134659},
      lat: "33.900803",
      lang: "-84.134659",
      map: map,
      title: "Providence Christian Academy",
      label: "C"
    },
    {
      name: "eastLake",
      position: {lat: 33.743521, lng: -84.302776},
      lat: "33.743521",
      lang: "-84.302776",
      map: map,
      title: "East Lake Golf Club",
      label: "D"
    },
    {
      name: "formulaCrossFit",
      position: {lat: 33.938575, lng: -84.236546},
      lat: "33.938575",
      lang: "-84.236546",
      map: map,
      title: "Formula CrossFit",
      label: "E"
    }
  ];

  this.markers = [];

  this.mapOptions = {
    center: {lat: 33.754341, lng: -84.381287},
    zoom: 10
  };

  this.infoWindow = new google.maps.InfoWindow();
};

places.prototype.initMap = function() {
  this.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);
}

places.prototype.initMarkers = function() {
  for (var i = 0, len = this.starterLocations.length; i < len; i++) {
    var marker = new google.maps.Marker(this.starterLocations[i]);
    this.markers.push(marker);
  }
  //console.log(this.markers);
}

var myPlaces = new places ();
myPlaces.initMap();
myPlaces.initMarkers();











