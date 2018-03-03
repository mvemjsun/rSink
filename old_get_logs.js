var K = require('./constants')

function fetchLogs(request, db) {
	console.log('Retrieving logs...');
	let p = request.path;

	switch (p) {
		case `${K.Constants.FETCH_LOGS_IN_RANGE()}`:
			let data = fetchLogsInRange(request, db);
			console.log(`Found ${data}`);
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

	console.log(`From     - ${from}`);
	console.log(`To       - ${to}`);
	console.log(`matching - ${matching}`);

	var data = [];

	let matchString = `%${matching}%`;

	db.each("SELECT verb, headers, body, createdat, query, url FROM requestlogs WHERE \
		createdat BETWEEN ? AND ? AND url LIKE ?",[from, to, matchString], (error,row) => {
			if (error) {
				console.log("error");
			} else {
				data.push(row.url);
			}
	}, (error,rows) => {
		if (!error) {
			console.log(`${rows} rows found.`)
			return data;
		}
	});
}
exports.fetchLogs = fetchLogs 
