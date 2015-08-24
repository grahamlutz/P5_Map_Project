function mapViewModel() {
	var self = this;

	this.markers = ko.observableArray(myPlaces.markers);
	//console.log(this.markers);
	for( var i = 0; i < self.markers().length; i++) {
		self.markers()[i].showItem = ko.observable(true);
        self.markers()[i].setMap(myPlaces.map);
        addMarkerListener(self.markers()[i]);
	};

	self.menuVis = ko.observable(false);
	self.showMenuVis = function() {
		if(!self.menuVis()){
			self.menuVis(true);
		} else {
			self.menuVis(false);
		}
	};

	function addMarkerListener(marker) {
        google.maps.event.addListener(marker, 'click', function() {
            self.infoWindow().setContent(iWContent);
            self.showInfoWindow(marker);

        });
    }

	self.infoWindow = ko.observable(myPlaces.infoWindow);
	//console.log(myPlaces.infoWindow);
	var iWContent = "";

	self.showInfoWindow = function(marker) {
		var currentMarker = marker;
		$.ajax({
			url: 'https://api.instagram.com/v1/tags/' + currentMarker.hashtag + '/media/recent?',
			dataType: 'jsonp',
			type: 'GET',
    		data: {client_id: "61e9fb165da1477c8413a2afeedda8ab"},
    		success: function(data) {
    			//console.log(data);
    			//console.log(data.data[0].link);
    			iWContent = '<a href="' + data.data[0].link + '">#' + data.data[0].tags[0] + '</a>' +  ' ' + data.data[0].caption.text;
    			//console.log(iWContent);
    		},
    		error: function(data2) {
    			alert("Cannot get Instagram images...");
    		}
		})
		// self.infoWindow().setContent(iWContent);
		//console.log(self.infoWindow());
		self.infoWindow().open(myPlaces.map, currentMarker);
	}

}

ko.applyBindings(new mapViewModel());