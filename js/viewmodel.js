function mapViewModel() {
	var self = this;

	self.markers = ko.observableArray(myPlaces.placeMarkers);
	//console.log("tada!" + this.markers()[1].title);
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
            self.showInfoWindow(marker);
        });
    }

	self.infoWindow = ko.observable(myPlaces.infoWindow);
	//console.log(myPlaces.infoWindow);
	var iWContent = "Loading instagram data...";

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
    			iWContent = '<img src="' + data.data[0].images.low_resolution.url + '"><div class="info-window"><a href="' + data.data[0].link + '">#' + data.data[0].tags[0] + '</a>' +  ' ' + data.data[0].caption.text + '</div>';
    			//console.log(iWContent);
    			self.infoWindow().setContent(iWContent);
    			self.infoWindow().open(myPlaces.map, currentMarker);

    		},
    		error: function(data2) {
    			alert("Cannot get Instagram images...");
    		}
		})
		// self.infoWindow().setContent(iWContent);
		//console.log(self.infoWindow());
		//self.infoWindow().open(myPlaces.map, currentMarker);
	}

	self.searchInput = ko.observable();

	self.filter = function() {
		//if indexOf(seachInput value), setVisible, showItem.
		var inputValue = self.searchInput();
		console.log(inputValue);
		for (var i in self.markers()) {
            if(self.markers()[i].title.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0) {
            	console.log(self.markers()[i]);
            	console.log(self.markers()[i].title.toLowerCase().indexOf(inputValue));
                self.markers()[i].showItem(true);
                self.markers()[i].setVisible(true);
            } else {
                self.markers()[i].showItem(false);
                self.markers()[i].setVisible(false);
                self.infoWindow().close();
            }
        }
	}
}

ko.applyBindings(new mapViewModel());