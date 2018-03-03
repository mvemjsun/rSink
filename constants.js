class Constants {

	static FETCH_LOGS_IN_RANGE() {
		return "/api/requestlog/range"
	}

	static FETCH_LOGS_RECENT() {
		return "/api/requestlog/recent"
	}

	static LOGS_RESET() {
		return "/api/reset/requestlog"
	}
}

exports.Constants = Constants