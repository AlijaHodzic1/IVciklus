const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const users = [
	{ id: 1, name: "Sara" },
	{ id: 2, name: "Marko" },
	{ id: 3, name: "Amir" },
];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.get("/about", (req, res) => {
	res.send("<h1>O nama</h1>");
});

app.get("/user/:name", (req, res) => {
	const userName = req.params.name;
	res.send(`Zdravo, ${userName}!`);
});

app.get("/search", (req, res) => {
	const { query, category } = req.query;
	res.send(`Pretraga za pojam: ${query} u kategoriji: ${category}`);
});

app.get("/users", (req, res) => {
	res.send(JSON.stringify(users));
});

app.post("/add-user", (req, res) => {
	const { name, age } = req.body;
	res.send(`Dodat je korisnik ${name} koji ima ${age} godina.`);
});

app.post("/feedback", (req, res) => {
	const { message } = req.body;
	res.send(`Poruka primljena: ${message}`);
});

app.get("/math/:a/:b", (req, res) => {
	const x = req.params.a;
	const y = req.params.b;
	const xNumber = Number(x);
	const yNumber = Number(y);
	res.send(`Zbir brojeva u parametru jeste: ${xNumber + yNumber}`);
});

app.get("/multiply", (req, res) => {
	const { n1, n2 } = req.query;
	res.send(`Proizvod brojeva jeste: ${n1 * n2}`);
});

app.listen(3000, () => {
	console.log("Server radi. http://localhost/3000");
});
