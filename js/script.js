var map;
var starterLocations = [
  {
    "name": "homeSweetHome",
    "lat": "33.974559",
    "lang": "-84.237619",
    "map": map,
    "title": "Childhood Home",
    "label": "A"
  },
  {
    "name": "college",
    "lat": "33.754341",
    "lang": "-84.381287",
    "map": map,
    "title": "Georgia State University",
    "label": "B"
  },
  {
    "name": "highSchool",
    "lat": "33.900803",
    "lang": "-84.134659",
    "map": map,
    "title": "Providence Christian Academy",
    "label": "C"
  },
  {
  "name": "eastLake",
    "lat": "33.743521",
    "lang": "-84.302776",
    "map": map,
    "title": "East Lake Golf Club",
    "label": "D"
  },
  {
    "name": "formulaCrossFit",
    "lat": "33.938575",
    "lang": "-84.236546",
    "map": map,
    "title": "Formula CrossFit",
    "label": "E"
  }
];

function toggleBounce() {
  if (this.getAnimation() !== null) {
    this.setAnimation(null);
  } else {
    this.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function stopAnimation(marker) {
  setTimeout(function () {
      marker.setAnimation(null);
  }, 3000);
}

function mapViewModel() {

  var mapOptions = {
    center: {lat: 33.974559, lng: -84.237619},
    zoom: 10
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

ko.applyBindings(new mapViewModel());