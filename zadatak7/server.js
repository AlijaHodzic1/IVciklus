const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

app.use(express.json());
app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.listen(3000, () => {
	console.log("Aplikacija pokrenuta.");
});
