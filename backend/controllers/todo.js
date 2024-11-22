const Task = require("../models/Task");
const { CreateCustomError } = require("../utils/customApiError");

// get all
const getAllTodo = async (req, res) => {
	try {
		const tasks = await Task.find({});

		await res.status(200).json({ status: 200, data: tasks });
	} catch (error) {
		res.status(500).json({ status: 500, data: "Something went wrong" });
	}
};

// get Single task
const getTodo = async (req, res, next) => {
	try {
		const { id: idTask } = req.params;

		const findOne = await Task.findOne({ _id: idTask });

		if (!findOne) {
			return next(CreateCustomError(`Task not found with id ${idTask}`, 404));
		}

		return await res.status(200).json({
			status: 200,
			data: findOne,
		});
	} catch (error) {
		res.status(500).json({
			status: 500,
			msg: error,
		});
	}
};

// create
const createNewTodo = async (req, res, next) => {
	try {
		const { body } = req;
		const result = await Task.create({
			name: body.name,
			completed: body.completed,
			content: body.content,
		});
		console.log(result);
		await res.status(201).json({ status: 200, data: body });
	} catch (error) {
		console.error(error);
		// apabila sintaksis tidak sesuai dengan scema
		let errorResponse = {
			error: {
				status: 400,
				data: {},
			},
		};
		for (const key in error.errors) {
			const obj = error.errors;
			const message = obj[key].properties.message;

			errorResponse.error.data[key] = message;
		}

		await res.status(400).json(errorResponse);
	}
};

// update
const updateTodo = async (req, res) => {
	try {
		const keyObj = ["name", "completed", "content"];
		const { id: updateId } = req.params;
		const { body } = req;
		console.log(body);
		const taskUpdate = await Task.findByIdAndUpdate(updateId, body, {
			new: true,
			runValidators: true,
		});

		const keysInBody = Object.keys(body); // Ambil semua key dari objek body

		// Cek apakah semua key dari body ada di array data
		const isAllKeysExist = keysInBody.every((key) => keyObj.includes(key));

		console.log(isAllKeysExist);
		if (!taskUpdate) {
			return res.status(404).json({
				status: 404,
				message: `Task not found with id ${updateId}`,
			});
		}

		if (Object.keys(body).length === 0 || !isAllKeysExist) {
			return res.status(400).json({
				status: 400,
				message: `Data ${keyObj.join(" ")} shouldn't be empty! `,
			});
		} else {
			await res.status(200).json({
				status: 200,
				data: {
					id: taskUpdate._id,
					name: taskUpdate.name,
					completed: taskUpdate.completed,
					content: taskUpdate.content,
				},
			});
		}
	} catch (error) {
		// res.status(500).json({ status: 500, msg: error });
		let errorResponse = {
			status: 400,
			data: {},
		};
		for (const key in error.errors) {
			const obj = error.errors;
			const message = obj[key].properties.message;

			errorResponse.data[key] = message;
		}

		await res.status(400).json(errorResponse);
	}
};

// delete
const deleteTodo = async (req, res) => {
	try {
		const { id: deleteId } = req.params;
		const deleteData = await Task.findOneAndDelete({ _id: deleteId });

		if (!deleteData) {
			return res.status(404).json({
				status: 404,
				message: `Task not found with id ${deleteId}`,
			});
		}

		await res.status(200).json({ status: 200, data: deleteData });
	} catch (error) {
		res.status(500).json({ status: 500, msg: error });
	}
};

module.exports = { getAllTodo, getTodo, createNewTodo, updateTodo, deleteTodo };
