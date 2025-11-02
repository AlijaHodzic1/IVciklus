const mongoose = require("mongoose");

const courseScheme = mongoose.Schema({
	title: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 12,
	},
	description: String,
	duration: String,
});

module.exports = mongoose.model("course", courseScheme);
