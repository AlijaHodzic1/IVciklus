const mongoose = require("mongoose");

const ProizvodSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
		ref: "Category",
	},
	manufacturer: {
		type: String,
		required: true,
		ref: "Manufacturer",
	},
	inStock: {
		type: Boolean,
		required: true,
	},
	ratings: [{ ref: "Rating" }],
});

module.exports = mongoose.model("Product", ProizvodSchema);
