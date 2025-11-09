const mongoose = require("mongoose");

const receptSchema = new mongoose.Schema({
	nazivHrane: {
		type: String,
		required: true,
	},
	vremePripreme: {
		type: Number,
		required: true,
	},
	sastojci: [String],
	kategorija: { type: String, default: "Ostalo" },
});

module.exports = mongoose.model("Recept", receptSchema);
