const express = require("express");
const morgan = require("morgan");
const todo = require("./router/todo");
const app = express();

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandlers");

require("dotenv").config();
// for connect db
const connectDb = require("./db/connect");

global.globalPath = __dirname;
// Versi aplikasi
const appVersion = "v1";

// Middleware untuk menambahkan header versi
app.use((req, res, next) => {
	const { headers } = req;

	if (headers.version !== appVersion) {
		res
			.status(400)
			.json({ status: 400, msg: "Version must be a valid version" });
	}

	res.setHeader("version", appVersion);
	next();
});

// midleware
// parsing request json become object
app.use(express.json());

// see response time s
app.use(morgan("tiny"));
const PORT = process.env.PORT || 3200;

// router
app.use("/api/v1/todo", todo);

// middleware for router not exist
app.use(notFound);

// Middleware untuk menangani error
app.use(errorHandler);

//connect db and server
const start = async () => {
	try {
		/**
		 * 1. connect db first
		 * 2. connect server
		 */
		await connectDb(process.env.MONGO_URI);
		app.listen(PORT, console.log(`server is running in PORT ${PORT}`));
	} catch (error) {
		console.error(error);
	}
};

start();
