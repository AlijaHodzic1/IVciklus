const mongoose = require("mongoose");

const teacherScheme = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 12,
	},
	subject: String,
	experience: String,
});

module.exports = mongoose.model("teacher", teacherScheme);
