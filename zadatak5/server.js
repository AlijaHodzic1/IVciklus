const express = require("express");
const app = express();
const usersRouter = require("./routes/usersRoute");
const postsRouter = require("./routes/postsRoute");
const todosRouter = require("./routes/todosRoute");
const PORT = 3000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/todos", todosRouter);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
