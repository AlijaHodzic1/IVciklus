require("dotenv").config();
const express = require("express");
const app = express();
const receptRoutes = require("./routes/recepti");
const mongoose = require("mongoose");

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Povezano sa bazom.");
	})
	.catch((err) => {
		console.log(err);
	});

app.use(express.json());
app.use("/recepti", receptRoutes);

app.listen(3000, () => {
	console.log("Povezan sa serverom.");
});
