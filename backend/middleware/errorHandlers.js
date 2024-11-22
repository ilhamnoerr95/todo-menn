const { CustomApiError } = require("../utils/customApiError");

const errorHandler = (err, req, res, next) => {
	if (err instanceof CustomApiError) {
		return res.status(err.status).json({
			error: {
				message: err.message,
				status: err.status,
			},
		});
	}

	return res.status(500).json({
		error: {
			message: "Something went wrong!",
			status: 500,
		},
	});
};

module.exports = errorHandler;
