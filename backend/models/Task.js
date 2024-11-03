const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Must provide a name"],
		maxLength: [10, "Maximal only 10 characters"],
	},
	completed: {
		type: Boolean,
		required: [true, "Must provide a completed"],
		default: false,
	},
	content: {
		type: String,
		required: [true, "Must provide a content"],
		minLength: [10, "Minimum 10 characters"],
	},
});

module.exports = mongoose.model("tasks", taskSchema);
