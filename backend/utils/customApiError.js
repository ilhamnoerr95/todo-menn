class CustomApiError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.status = statusCode;
	}
}

const CreateCustomError = (msg, statusCode) => {
	return new CustomApiError(msg, statusCode);
};

module.exports = { CustomApiError, CreateCustomError };
