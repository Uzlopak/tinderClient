function doXMLHttpRequest(address, callback, POSTdata) {
    var method = (typeof POSTdata === undefined) ? "GET" : "POST";
    var params = (method === "GET") ? null : convertObjectToPOSTParam(POSTdata);
    var xhr = new XMLHttpRequest();
    
    xhr.open(method, address, true);
    
    //Send the proper header information along with the request
    if (method === "POST") {
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    
    xhr.onload = function () {
      parsed = JSON.parse(this.response);
      callback(parsed);
    };
    xhr.setRequestHeader("x-auth-token", localStorage.getItem("TinderWeb/APIToken"));
    xhr.send(params);
}

function convertObjectToPOSTParam (data) {
	var result = [];
	for (i in data) {
		result.push(i + "=" + data[i]);
    }
	return result.join("&");
}
function getUserData(userId, callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/user/" + userId, callback);
}

function likeUser(userId, callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/like/" + userId, callback);
}

function passUser(userId, callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/pass/" + userId, callback);
}

function getRecommendations(callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/user/recs", callback);
}

function setGeoPosition(latitude, longitude, callback) {
  callback = callback || function (response) {console.log(response)};
  doXMLHttpRequest("https://api.gotinder.com/user/ping", callback, {lat: latitude, lon: longitude});
}
