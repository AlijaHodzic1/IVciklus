const express = require("express");
const router = express.Router();
let posts = require("../posts-data");
const users = require("../users-data");

router.get("/", (req, res) => {
	res.json(posts);
});

router.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const post = posts.find((p) => p.id === id);
	if (!post) return res.status(404).send(`Ne postoji post sa ${id} IDjem.`);
	res.send(post);
});

router.post("/", (req, res) => {
	const { name } = req.body;
	const newPost = { id: posts.length + 1, name };
	if (name.length < 3)
		return res.status(400).send("Novo ime mora imati bar 3 slova.");
	posts.push(newPost);
	res.sendStatus(200);
});

router.delete("/:id", (req, res) => {
	const id = req.params.id;
	users = users.filter((u) => u.id !== id);
	res.sendStatus(204);
});

module.exports = router;
