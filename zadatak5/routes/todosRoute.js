const express = require("express");
const router = express.Router();
let users = require("../todos-data");

router.get("/", (req, res) => {
	res.json(users);
});

router.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const user = users.find((u) => u.id == id);
	if (!user) return res.status(404).send(`Ne postoji user kojem je id ${id}`);
	res.json(user);
});

router.post("/", (req, res) => {
	const { name } = req.body;
	const newUser = { id: users.length + 1, name };
	if (newUser.name.length < 3)
		return res.status(400).send("Ime mora biti duze od 2 slova");
	users.push(newUser);
	res.sendStatus(200);
});

router.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	users = users.filter((u) => u.id !== id);
	res.sendStatus(204);
});

module.exports = router;
