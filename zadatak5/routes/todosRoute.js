const express = require("express");
const router = express.Router();
let todos = require("../todos-data");

router.get("/", (req, res) => {
	res.json(todos);
});

router.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const todo = todos.find((t) => t.id == id);
	if (!todo) return res.status(404).send(`Ne postoji todo kojem je id ${id}`);
	res.json(todo);
});

router.post("/", (req, res) => {
	const { title, completed } = req.body;
	const newTodo = { id: todos.length + 1, title, completed };
	if (newTodo.title.length < 3)
		return res.status(400).send("Naslov mora biti duzi od 2 slova");
	todos.push(newTodo);
	res.sendStatus(200);
});

router.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	todos = todos.filter((t) => t.id !== id);
	res.sendStatus(204);
});

module.exports = router;
