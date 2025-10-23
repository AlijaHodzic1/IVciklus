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

// Zavrsen 3- Middleware lanac, tjst check time i check auth.

const nonExist = (req, res, next) => {
	res.status(404).send("<h2>404 - Stranica nije pronadjena.</h2>");
};

// Zavrsen 4. Globalni 404 middleware

const validateRegister = (req, res, next) => {
	const { username, password, email } = req.body;
	if (
		!username ||
		username.length < 3 ||
		!password ||
		password.length < 3 ||
		!email ||
		!email.includes("@")
	) {
		return res.status(400).json({ error: "Podaci nisu validni!" });
	}
	next();
};

// Zavrsen 5. middleware: provera pravilne registracije za post request.

const checkVip = (req, res, next) => {
	const { vip } = req.query;
	if (vip !== "true") {
		return res.status(403).send("Pristup dozvoljen samo vip korisnicima!");
	}
	next();
};

//Zavrsen 6. zadatak= VIP ruta, query vezba

const timer = (req, res, next) => {
	const vSad = Date.now();
	res.on("finish", () => {
		const duration = Date.now() - vSad;
		console.log(`Request ${req.method} ${req.url} obradjen u ${duration} ms.`);
	});
	next();
};
app.use(timer);
//Zavrsen bonus zadatak.

// Rute

app.get("/dashboard", checkRole, (req, res) => {
	res.send("Dobrodosao na admin dashboard!");
});

app.get("/profile", (req, res) => {
	res.send("Ovo je korisnicki profil.");
});

app.get("/secret", checkTime, checkAuth, (req, res) => {
	res.send("Dobrodošli u tajnu sekciju!");
});

app.post("/register", validateRegister, (req, res) => {
	res.json({ message: "Uspesno registrovan korisnik!" });
});

app.get("/public-info", (req, res) => {
	res.send("Ovo je javna informacija.");
});

app.get("/vip-info", checkVip, (req, res) => {
	res.send("Dozvoljen pristup vip informacijama.");
});
// Rute
app.use(nonExist);

app.listen(PORT, () => {
	console.log("server uspesno pokrenut na url-u: http://localhost:3000");
});
