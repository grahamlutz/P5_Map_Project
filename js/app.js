/*
 * Model function with initial location and map data plus infoWindow initializaton.
 */

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

var myPlaces = new places ();

/*
 * Main KnockoutJS ViewModel function
 */

function mapViewModel() {
  var self = this;
  //loop through starterLocations to set the markers and add click listening
  self.markers = ko.observableArray(myPlaces.placeMarkers);
  for( var i = 0; i < self.markers().length; i++) {
    self.markers()[i].showItem = ko.observable(true);
        self.markers()[i].setMap(myPlaces.map);
        addMarkerListener(self.markers()[i]);
  };
  //display locations in the list menu
  self.menuVis = ko.observable(false);
  self.showMenuVis = function() {
    if(!self.menuVis()){
      self.menuVis(true);
    } else {
      self.menuVis(false);
    }
  };
  // Add listener to markers to animate and show infoWindow on click. 
  function addMarkerListener(marker) {
    google.maps.event.addListener(marker, 'click', function() {
      if (marker.getAnimation() == null) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
          marker.setAnimation(null);
        }, 2000);
      } else {
        marker.setAnimation(null);
      }
      self.showInfoWindow(marker);
    });
  }

  self.infoWindow = ko.observable(myPlaces.infoWindow);
  var iWContent = "Loading instagram data...";
  //Function to get instagram data via hashtag property of myPlaces.starterLocations 
  // and format and display it in the info window.
  self.showInfoWindow = function(marker) {
    var currentMarker = marker;
    self.infoWindow().close(myPlaces.map, currentMarker);
    //Instagram API call.  
    $.ajax({
      url: 'https://api.instagram.com/v1/tags/' + currentMarker.hashtag + '/media/recent?',
      dataType: 'jsonp',
      type: 'GET',
      data: {client_id: "61e9fb165da1477c8413a2afeedda8ab"},
      success: function(data) {
          iWContent = '<div class="instagram"><img info-window" src="' + data.data[0].images.low_resolution.url + '"><div class="info-window"><a href="' + 
          data.data[0].link + '">#' + data.data[0].tags[0] + '</a>' +  ' ' + data.data[0].caption.text + '</div></div>';
          self.infoWindow().setContent(iWContent);
          self.infoWindow().open(myPlaces.map, currentMarker);

      },
      error: function(data2) {
        alert("Cannot get Instagram images...");
      }
    })
  }

  self.searchInput = ko.observable("");
  var inputValue = self.searchInput();
  //Filter function for the search bar.  Take search bar user input and display 
  // items that contain input in the menu list and as markers on the map
  self.filter = ko.pureComputed({
    read: function() {
      return self.searchInput()
      },
    write: function(value) {
      for (var i in self.markers()) {
        if(self.markers()[i].title.toLowerCase().indexOf(self.searchInput().toLowerCase()) >= 0) {
          self.markers()[i].showItem(true);
          self.markers()[i].setVisible(true);
        } else {
          self.markers()[i].showItem(false);
          self.markers()[i].setVisible(false);
          self.infoWindow().close();
        }
      }
    }
  })
}

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
}

myPlaces.initMap();
myPlaces.initMarkers();
ko.applyBindings(new mapViewModel());










