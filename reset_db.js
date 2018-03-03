function resetDb(db) {
	return new Promise((resolve, reject) => {
		db.run("DELETE FROM requestlogs", error => {
			if (error) {
				reject(`Could not reset db - ${error}`);
			} else {
				resolve("Database reset successfully");
			}
		});
	}
)};

exports.resetDb = resetDb;