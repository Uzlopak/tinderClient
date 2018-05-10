function doXMLHttpRequest(address, callback, POSTdata) {
    var method = (typeof POSTdata === "undefined") ? "GET" : "POST";
    var params = (method === "GET") ? null : convertObjectToPOSTParam(POSTdata);
    var xhr = new XMLHttpRequest();
    
    xhr.open(method, address, false);
    
    //Send the proper header information along with the request
    if (method === "POST") {
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    
    xhr.onload = function () {
      parsed = JSON.parse(this.response);
      callback(parsed);
    };
    xhr.setRequestHeader("x-auth-token", tinderAPIToken);
    xhr.send(params);
}

function convertObjectToPOSTParam (data) {
	var result = [];
	for (i in data) {
		result.push(i + "=" + data[i]);
    }
	return result.join("&");
}