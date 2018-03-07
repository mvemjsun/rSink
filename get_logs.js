var K = require('./constants')

function fetchLogs(request, db) {
	let p = request.path;

	switch (p) {
		case `${K.Constants.FETCH_LOGS_IN_RANGE()}`:
			return new Promise( (resolve,reject) => fetchLogsInRange(request, db).then( data => {
				resolve(data);
			}).catch( data => {
				reject(data);
			}));
			break;
		case `${K.Constants.FETCH_LOGS_RECENT()}`:
			console.log("Will be implemented in future");
			break;
		default:
			console.log(`Dont know how to process ${p}`);
			console.log(`${K.Constants.FETCH_LOGS_IN_RANGE()}`);
	}
}

function fetchLogsInRange(request, db) {
	let q = request.query;
	let from = q.from;
	let to = q.to;
	let matchingUrl = q.matching || '';
	var data = [];

	let matchString = `%${matchingUrl}%`;

	let fromOK = Date.parse(from);
	let toOK = Date.parse(to);

	if (isNaN(fromOK) || isNaN(toOK)) {
		return new Promise( (resolve,reject) => {
			reject("One or both of input dates are invalid");
		});
	}
	return new Promise( (resolve,reject) => 

		db.each("SELECT verb, headers, body, createdat, query, url,contenttype FROM requestlogs WHERE \
		createdat BETWEEN ? AND ? AND url LIKE ? ORDER BY createdat DESC", 
		[from, to, matchString], (error,row) => {
			if (error) {
				reject(error);
			} else {
				data.push(row);
			}
	}, (error,rows) => {
		if (error) {
			reject(error);
		} else {
			console.log(`${rows} rows found.`)
			resolve(data);
		} 
	}));
}
exports.fetchLogs = fetchLogs 
