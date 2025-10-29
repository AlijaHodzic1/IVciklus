const express = require("express");
const app = express();
const PORT = 3000;
const studentRoute = require("./routes/studentsRoute");
const booksRoute = require("./routes/booksRoute");
const courseRoute = require("./routes/courseRoute");

app.use(express.json());

app.use("/students", studentRoute);
app.use("/books", booksRoute);
app.use("/courses", courseRoute);

app.listen(PORT, () => {
	console.log("Aplikacija pokrenuta.");
});
