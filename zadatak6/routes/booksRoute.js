const express = require("express");
const router = express.Router();
const Books = require("../data/books");
const bookValidation = require("../middleware/bookValidation");
const logger = require("../middleware/logger");

router.use(logger);

router.get("/", (req, res) => {
	res.json(Books);
});

router.get("/:id", (req, res) => {
	const id = +req.params.id;
	const book = Books.find((b) => b.id === id);
	if (!book) return res.sendStatus(404);
	res.json(book);
});

router.post("/", bookValidation, (req, res) => {
	const { title, author, year, pages } = req.body;
	const newBook = { id: Books.length + 1, title, author, year, pages };
	Books.push(newBook);
	res.sendStatus(201);
});

router.put("/:id", bookValidation, (req, res) => {
	const id = +req.params.id;
	const index = Books.findIndex((b) => b.id === id);

	if (index === -1) return res.sendStatus(404);

	const { title, author, year, pages } = req.body;
	Books[index] = { title, author, year, pages };
});

router.patch("/:id", (req, res) => {
	const id = +req.params.id;
	const book = Books.find((b) => b.id == id);

	if (!book) return res.sendStatus(404);

	const { title, author, year, genre } = req.body;

	if (title) book.title = title;
	if (author) book.author = author;
	if (year) book.year = year;
	if (pages) book.pages = pages;
	res.sendStatus(201);
});

router.delete("/:id", (req, res) => {
	const id = +req.params.id;
	Books = Books.filter((b) => b.id !== id);
	res.sendStatus(204);
});

module.exports = router;
