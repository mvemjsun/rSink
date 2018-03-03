
var K = require('./constants')

function requestQuery(request) {
	let q = request.path;

	switch (q) {
		case `${K.Constants.FETCH_LOGS_IN_RANGE()}`:
			console.log(q);
			break;
		default:
			console.log(`Dont know how to process ${q}`);
			console.log(`${K.Constants.FETCH_LOGS_IN_RANGE()}`);
	}
}

exports.requestQuery = requestQuery