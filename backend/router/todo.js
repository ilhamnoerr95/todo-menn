const express = require("express");
const router = express.Router();

const {
	getAllTodo,
	getTodo,
	createNewTodo,
	updateTodo,
	deleteTodo,
} = require("../controllers/todo.js");

router.get("/", getAllTodo);
router.post("/", createNewTodo);

router.get("/:id", getTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
