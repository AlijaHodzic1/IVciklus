const mongoose = require("mongoose");

const categoryScheme = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	parentCategory: {
		ref: "Category",
		default: null,
	},
	products: [{ ref: "Product" }],
});

module.exports = mongoose.model("Category", categoryScheme);
