require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
	});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
