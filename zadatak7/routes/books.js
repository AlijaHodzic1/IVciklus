const express = require("express");
const router = express.Router();
var { users, books } = require("../data");

// Korisnik može imati više knjiga — koju relaciju to predstavlja?

// 1 -> N

// Knjiga može biti pozajmljena od više korisnika — koju relaciju to predstavlja?

// 1 -> N

router.get("/", (req, res) => {
	res.json(books);
});

router.get("/borrowed", (req, res) => {
	const borrowedBookIds = users.flatMap((u) => u.borrowedBooks);
	const borrowedBooks = books.filter((b) => borrowedBookIds.includes(b.id));

	res.json(borrowedBooks);
});

router.get("/:id", (req, res) => {
	const id = +req.params.id;
	const book = books.find((b) => b.id == id);
	if (!book) return res.sendStatus(404);
	res.json(book);
});

router.post("/", (req, res) => {
	const { title } = req.body;
	const newBook = { id: books.length + 1, title };
	if (books.includes(title)) return res.sendStatus(400);

	books.push(newBook);
	res.sendStatus(200);
});

router.put("/:id", (req, res) => {
	const id = +req.params.id;
	const { title } = req.body;
	const index = books.findIndex((s) => s.id == id);
	if (index === -1) return res.sendStatus(404);

	books[index] = { id, title };

	res.json(books[index]);
});

router.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	books = books.filter((b) => b.id !== id);
	res.sendStatus(204);
});

module.exports = router;
