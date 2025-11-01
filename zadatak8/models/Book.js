const mongoose = require("mongoose");

const booksScheme = mongoose.Schema({
	title: String,
	author: String,
	year: Number,
});

module.exports = mongoose.model("Book", booksScheme);
