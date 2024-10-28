const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	name: { type: String, required: [true, "Must provide a name"] },
	completed: {
		type: Boolean,
		required: [true, "Must provide a completed"],
		default: false,
	},
});

module.exports = mongoose.model("tasks", taskSchema);
