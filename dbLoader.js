let config = require('./package').config

function getDbHandle(db) {
	let myDb = new db.Database(`${config.dbName}`, "OPEN_READWRITE", error => {
		if (error) {
			console.log('Error opening the sqlite db !');
			console.log(error);
			process.exit(-1);
		} else {
			console.log('SQLITE db opened successfully');
		}
	});
	return myDb;
}

exports.getDbHandle = getDbHandle;