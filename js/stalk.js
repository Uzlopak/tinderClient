function beginHunt(options) {
	drawCircle(options);
	map.addListener('click', smokeOut);
}

function smokeOut(e) {
	var fromLatLon = new google.maps.LatLng(positionLat, positionLon);
	var toLatLon = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
	var distance = google.maps.geometry.spherical.computeDistanceBetween(fromLatLon, toLatLon);
	var userId = $('.prey').data('id');
	if (google.maps.geometry.spherical.computeDistanceBetween(fromLatLon, toLatLon) > 2000) {
		setGeoPosition(e.latLng.lat(), e.latLng.lng(), function (response) {
			getProfileData(userId, function(response) {
				var circleOptions = {lat: e.latLng.lat(), lon: e.latLng.lat(), radius: response.results.distance_mi};
				drawCircle(circleOptions);
			})
		})
	}
}