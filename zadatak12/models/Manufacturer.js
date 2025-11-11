const mongoose = require("mongoose");

const manufacturerScheme = mongoose.Schema({
	name: String,
	country: String,
	yearEstablished: Number,
	products: [{ ref: "Prodcut" }],
});

module.exports = mongoose.model("Manufacturer", manufacturerScheme);
