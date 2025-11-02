require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const courseRoutes = require("./routes/courses");
const teacherRoutes = require("./routes/teachers");

const app = express();
app.use(express.json());

app.use("/courses", courseRoutes);
app.use("/teachers", teacherRoutes);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Povezano sa bazom.");
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(3000, () => {
	console.log("Server je pokrenut na http://localhost:3000.");
});
