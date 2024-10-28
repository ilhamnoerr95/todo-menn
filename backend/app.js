
const express = require('express');
const morgan = require('morgan');
const todo = require("./router/todo")
const app = express();

require('dotenv').config()
// for connect db
const connectDb = require("./db/connect")

global.globalPath = __dirname
// midleware
// parsing request json become object
app.use(express.json())

// see response time s
app.use(morgan("tiny"))
const PORT = process.env.PORT || 3200;

// router
app.use("/api/v1/todo", todo)

//connect db and server
const start = async ()=> {
    try {
        /**
         * 1. connect db first
         * 2. connect server
         */
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT, console.log(`server is running in PORT ${PORT}`))

    } catch (error) {
        console.error(error)
    }
}

start()
