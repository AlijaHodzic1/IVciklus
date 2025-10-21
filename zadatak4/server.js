const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const logger = (req, res, next) => {
	console.log(
		`datum requesta:${new Date().toLocaleString()}, metoda:${req.method}, url:${
			req.url
		}`
	);
	next();
};

const studentCheck = (req, res, next) => {
	const check = req.headers["x-student"];
	if (!check) {
		return res.status(400).send("Nepostojeci request! X-student neophodan!");
	}
	next();
};

app.use(logger);
// app.use(studentCheck);

// Kraj prvog zadatka (middleware koji loguje requestove i proverava za header.)

const checkRole = (req, res, next) => {
	const aCheck = req.query.role;
	if (aCheck !== "admin") {
		return res.status(403).send("Zabranjen pristup obicnim korisnicima!");
	}
	next();
};

app.get("/dashboard", checkRole, (req, res) => {
	res.send("Dobrodosao na admin dashboard!");
});

app.get("/profile", (req, res) => {
	res.send("Ovo je korisnicki profil.");
});

// Zavrsen drugi zadatak, kreirati middleware koji proverava role
// za pristup admin dashboard stranici.

const checkTime = (req, res, next) => {
	const now = new Date();
	const hour = now.getHours();
	if (hour >= 8 && hour <= 20) {
		next();
	} else {
		return res.status(403).send("Pristup moguć samo između 8h i 20h!");
	}
};

const checkAuth = (req, res, next) => {
	const key = req.headers["api-key"];
	if (!key || key !== "tajni123") {
		return res.status(401).send("Neautorizovan pristup!");
	}
	next();
};

app.get("/secret", checkTime, checkAuth, (req, res) => {
	res.send("Dobrodošli u tajnu sekciju!");
});

console.log("test");

app.listen(PORT, () => {
	console.log("server uspesno pokrenut na url-u: http://localhost:3000");
});
