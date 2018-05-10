      var map;
      var positionMarker;
      
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 52, lng: 8},
          zoom: 4
        });
      }
      
      
      
      function drawCircle(options) {
    	  var radius = options.radius || 0;
    	  var unitKey = options.unitKey || 'km';
    	  var centerPoint = new google.maps.LatLng(options.lat, options.lon);
    	  
    	  
    	  var earthRadii = {
    		      mi: 3963.1676,
    		      km: 6378.1,
    		      ft: 20925524.9,
    		      mt: 6378100,
    		      "in": 251106299,
    		      yd: 6975174.98,
    		      fa: 3487587.49,
    		      na: 3443.89849,
    		      ch: 317053.408,
    		      rd: 1268213.63,
    		      fr: 31705.3408
    		    };
  	    	
    	  var polygonDestructionHandler = function() {
	        return this.setMap(null);
	      };
    	  
    	      var circle, radius, select, unitKey;
    	      radius = (radius / earthRadii[unitKey]) * earthRadii['mt'];
    	      circle = new google.maps.Circle({
    	        center: centerPoint,
    	        clickable: true,
    	        draggable: false,
    	        editable: false,
    	        fillColor: '#004de8',
    	        fillOpacity: 0.27,
    	        map: map,
    	        radius: radius,
    	        strokeColor: '#004de8',
    	        strokeOpacity: 0.62,
    	        strokeWeight: 1
    	      });
    	      google.maps.event.addListener(circle, 'rightclick', polygonDestructionHandler);
    	      return circle;
      }
      
