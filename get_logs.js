var K = require('./constants')

function fetchLogs(request, db) {
	console.log('Retrieving logs...');
	let p = request.path;

	switch (p) {
		case `${K.Constants.FETCH_LOGS_IN_RANGE()}`:
			return new Promise( (resolve,reject) => fetchLogsInRange(request, db).then( data => {
				resolve(data);
			}));
			break;
		case `${K.Constants.FETCH_LOGS_RECENT()}`:
			console.log(q);
			break;
		default:
			console.log(`Dont know how to process ${q}`);
			console.log(`${K.Constants.FETCH_LOGS_IN_RANGE()}`);
	}
}

function fetchLogsInRange(request, db) {
	console.log('>>> Fetching request logs in range ...');
	let q = request.query;
	let from = q.from;
	let to = q.to;
	let matching = q.matching || '';
	var data = [];

	let matchString = `%${matching}%`;

	return new Promise( (resolve,reject) => 
		db.each("SELECT verb, headers, body, createdat, query, url FROM requestlogs WHERE \
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
