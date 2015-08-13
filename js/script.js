var map;

function initMap () {  
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.974559, lng: -84.237619},
    zoom: 10
  });

  var infoWindow = {
    homeSweetHome: new google.maps.InfoWindow ({
      content: "Home Sweet Home"
    }),
    college: new google.maps.InfoWindow ({
      content: "Georgia State University"
    }),
    highSchool: new google.maps.InfoWindow ({
      content: "Providence Christian Academy"
    }),
    eastLake: new google.maps.InfoWindow ({
      content: "East Lake Golf Club"
    }),
    formulaCrossFit: new google.maps.InfoWindow ({
      content: "Formula CrossFit"
    }),
  }

  var homeSweetHome = new google.maps.Marker ({
    position: {lat: 33.974559, lng: -84.237619},
    map: map, 
    animation: google.maps.Animation.DROP,
    title: "Childhood Home",
    label: "A"
  });
  homeSweetHome.addListener('click', function() {
    infoWindow.homeSweetHome.open(map, homeSweetHome);
  });
  homeSweetHome.addListener('click', toggleBounce);

  var college = new google.maps.Marker ({
    position: {lat: 33.754341, lng: -84.381287},
    map: map,
    animation: google.maps.Animation.DROP,
    title: "Georgia Statue University",
    label: "B"
  });
  college.addListener('click', function() {
    infoWindow.college.open(map, college);
  });
  college.addListener('click', toggleBounce);

  var highSchool = new google.maps.Marker ({
    position: {lat: 33.900803, lng: -84.134659},
    map: map,
    animation: google.maps.Animation.DROP,
    title: "Providence Christian Academy",
    label: "C"
  });
  highSchool.addListener('click', function() {
    infoWindow.highSchool.open(map, highSchool);
  });
  highSchool.addListener('click', toggleBounce);

  var eastLake = new google.maps.Marker ({
    position: {lat: 33.743521, lng: -84.302776},
    map: map,
    animation: google.maps.Animation.DROP,
    title: "East Lake Golf Club",
    label: "D"
  });
  eastLake.addListener('click', function() {
    infoWindow.eastLake.open(map, eastLake);
  });
  eastLake.addListener('click', toggleBounce);

  var formulaCrossFit = new google.maps.Marker ({
    position: {lat: 33.938575, lng: -84.236546},
    map: map,
    animation: google.maps.Animation.DROP,
    title: "Formula CrossFit",
    label: "E"
  });
  formulaCrossFit.addListener('click', function() {
    infoWindow.formulaCrossFit.open(map, formulaCrossFit);
  });
  formulaCrossFit.addListener('click', toggleBounce);

  function toggleBounce() {
    if (this.getAnimation() !== null) {
      this.setAnimation(null);
    } else {
      this.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
}



function mapViewModel() {
  
}
ko.applyBindings(new mapViewModel());