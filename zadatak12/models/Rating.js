const mongoose = require("mongoose");

const ratingScheme = mongoose.Schema({
	score: {
		type: Number,
		min: 1,
		max: 5,
	},
	comment: String,
	user: String,
	product: {
		ref: "Product",
	},
	dateCreated: Date.now,
});

module.exports = mongoose.model("Rating", ratingScheme);
