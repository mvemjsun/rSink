var bodyParser = require('body-parser');

function adaptRequest(request) {
	let jsonHeaders = JSON.stringify(request.headers);
	let url = request.url;
	let response = {}
	response.headers = jsonHeaders;
	response.path = request.path;
	response.query = request.query;
	response.method = request.method;
	response.params = request.params;
	response.body = request.body;
	return response;
}

exports.adaptRequest = adaptRequest;