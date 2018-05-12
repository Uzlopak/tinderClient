function getProfileData(userId, callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/user/" + userId, callback);
}

function getMeta(callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/meta", callback);
}

function likeUser(userId, callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/like/" + userId, callback, {});
}

function superLikeUser(userId, callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/like/" + userId + "/super/", callback, {});
}

function passUser(userId, callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/pass/" + userId, callback, {});
}

function getRecommendations(callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/user/recs", callback);
}

function setGeoPosition(latitude, longitude, callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/user/ping", callback, {lat: latitude, lon: longitude});
}

function getTinderProfileData(callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/profile?include=user%2Cplus_control%2Cboost%2Ctravel%2Ctutorials%2Cnotifications%2Cpurchase%2Cproducts%2Clikes%2Csuper_likes%2Cfacebook%2Cinstagram%2Cspotify%2Cselect&locale=de", callback);
}

function getMatches(callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/v2/matches?count=60&locale=de", callback);
}