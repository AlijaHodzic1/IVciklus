require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const Book = require("./models/Book");

const app = express();
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Povezano sa bazom.");
	})
	.catch((err) => {
		console.log(err);
	});

app.post("/", async (req, res) => {
	const { title, author, year } = req.body;
	try {
		const book = new Book({ title, author, year });
		await book.save();
		res.status(201).json(Book);
	} catch {
		res.status(501).json("Greska pri kreiranju novog podatka.");
	}
});

app.get("/", async (req, res) => {
	res.json(await Book.find());
});

app.listen(3000, () => {
	console.log("Povezan na URL: http://localhost:3000");
});
