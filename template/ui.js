function activateUI () {

  document.getElementById("loadByTinderToken").onclick = function () {
    tinderAPIToken = prompt("Enter Tinder-Token", tinderAPIToken);
    getTinderProfileData(function (response) {loadProfileToUI(response)});
  }
  
  document.getElementById("openRecommentationsWindow").onclick = function () {
    showRecommendationsWindow();
  }
  document.getElementById("openMatchesWindow").onclick = function () {
    showMatchesWindow();
  }
}

function loadProfileToUI(profile) {

  //GMap
  var geoPosition = new google.maps.LatLng(profile.pos.lat, profile.pos.lon);
  
  positionLat = profile.pos.lat;
  positionLon = profile.pos.lon;
  
  map.setCenter(new google.maps.LatLng(profile.pos.lat, profile.pos.lon));
  map.setZoom(14);
  positionMarker = new google.maps.Marker({
    position: geoPosition,
    draggable:true,
    animation: google.maps.Animation.DROP,
    map: map,
    title: profile.name
  });
  google.maps.event.addListener(positionMarker, 'dragend', function() 
  {
    if (confirm('Should the position be refreshed?')) {
        setGeoPosition(positionMarker.getPosition().lat(), positionMarker.getPosition().lng())
    } else {
        // Do nothing!
    }
  });

  document.getElementById("activeUserName").innerHTML = profile.name;
  document.getElementById("activeUserAge").innerHTML = calculateAge(profile.birth_date);
  document.getElementById("activeUserPhoto").src = profile.photos[0]["url"];
}

function calculateAge(birthday) { // birthday is a date
	birthday = typeof birthday === "date" ? birthday : new Date(birthday);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}



function showRecommendationsWindow() {
  $('<div class="recommmendationsWindow" title="Recommendations"></div>').dialog(
      {
        height: 500, 
        width: 600,
        modal: false,
        buttons: [
            {
                text: "Load",
                icon: "ui-icon-arrowrefresh-1-s",
                click: function() {
                  getRecommendations(function (response) {
                    var curProfile;
                    for (var i = 0; i < response.results.length; i += 1) {
                      curProfile = response.results[i];
                      $(".recommmendationsWindow" ).append(generateProfileBox(curProfile));
                    }
                  });
                }
              },
              {
                  text: "Like all",
                  icon: "ui-icon-heart",
                  click: function() {
					$(".recommmendationsWindow .tpd-like").trigger( "click" );
                  }
                },
                {
                    text: "Pass all",
                    icon: "ui-icon-closethick",
                    click: function() {
					$(".recommmendationsWindow .tpd-pass").trigger( "click" );
                    }
                  }
              ]
      }).dialogExtend({
        minimizable: true
      });
  
}

function showMatchesWindow() {
  $('<div class="matchesWindow" title="Matches"></div>').dialog(
      {
        height: 500, 
        width: 600,
        modal: false,
        buttons: [
            {
                text: "Load",
                icon: "ui-icon-arrowrefresh-1-s",
                click: function() {
                  getMatches(function (response) {
                    var curProfile;
                    for (var i = 0; i < response.data.matches.length; i += 1) {
                      curProfile = response.data.matches[i].person;
                      $(".matchesWindow" ).append(generateProfileBox(curProfile));
                    }
                  });
                }
              },
              {
                  text: "Like all",
                  icon: "ui-icon-heart",
                  click: function() {
                  }
                },
                {
                    text: "Pass all",
                    icon: "ui-icon-closethick",
                    click: function() {
                    }
                  }
              ]
      }).dialogExtend({
        minimizable: true
      });
  
}

function generateProfileBox (profile) {
	
	var profileBox = $('<div class="profile" data-id="' + profile._id + '"' + 
    		'>' + 
            '<img class="foto" width="84" height="84" src="' + profile.photos[0].processedFiles[3].url + '" />' +
            '<span class="name">' + profile.name + '</span>' + 
            '<span class="age">age: <b>' + calculateAge(profile.birth_date) + '</b></span>' +
            '<button type="button" class="ui-button ui-corner-all ui-widget tpd-localize"><span class="ui-button-icon ui-icon ui-icon-flag"></span></button>' +
            '<button type="button" class="ui-button ui-corner-all ui-widget tpd-like"><span class="ui-button-icon ui-icon ui-icon-heart"></span></button>' +
            '<button type="button" class="ui-button ui-corner-all ui-widget tpd-pass"><span class="ui-button-icon ui-icon ui-icon-closethick"></span></button>' +
            '<button type="button" class="ui-button ui-corner-all ui-widget ui-state-disabled"><span class="ui-button-icon ui-icon ui-icon-comment"></span></button>' +
            '<button type="button" class="ui-button ui-corner-all ui-widget"><span class="ui-button-icon ui-icon ui-icon-star"></span></button>' +
            '<button type="button" class="ui-button ui-corner-all ui-widget"><span class="ui-button-icon ui-icon ui-icon-alert"></span></button>' +
            '</div>');
	
    attachEventHandlers(profileBox);
    return profileBox;
}

function attachEventHandlers(element) {
	element.children('.tpd-localize').on('click', function () {
		var profileId = $(this).parent().data('id');
		getProfileData(profileId, function (profile) {
				generateProfileBox(profile.results).addClass('prey').appendTo(document.body);
				$(".recommmendationsWindow").dialogExtend("minimize");
				
				beginHunt({
					radius: profile.results.distance_mi,
					lat: positionLat,
					lon: positionLon
				})
		});
	});
	element.children('.tpd-like').on('click', function () {
		var profileId = $(this).parent().data('id');
		likeUser(profileId, function (response) {if(response.match) {alert("matched!")}});
		element.remove();
	});
	element.children('.tpd-pass').on('click', function () {
		var profileId = $(this).parent().data('id');
		passUser(profileId);
		element.remove();
	});
}