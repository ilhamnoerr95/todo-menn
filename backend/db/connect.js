const mongoose = require("mongoose");

const connectDb = (url) => {
	return mongoose
		.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then(() => console.log("Connected to database"))
		.catch((err) => console.log(err));
};

module.exports = connectDb;
