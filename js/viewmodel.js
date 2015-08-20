function mapViewModel() {
	var self = this;

	this.markers = ko.observableArray(myPlaces.markers);
	console.log(this.markers);
	for( var i = 0; i < self.markers().length; i++) {
		self.markers()[i].showItem = ko.observable(true);
        self.markers()[i].setMap(myPlaces.map);
	}
}

ko.applyBindings(new mapViewModel());