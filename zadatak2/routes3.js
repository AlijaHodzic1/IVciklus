const data = require("./data");
const fs = require("fs");

exports.handleRequests = (req, res) => {
	if (req.url === "/") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("Ovo je server 3.");
	} else if (req.url === "/data") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(data.proizvodi));
		const append = `Korisnik pristupio /data u ${new Date().toLocaleTimeString()}\n`;
		try {
			fs.writeFileSync("./log.txt", "Ovo je log.txt file.\n");
			fs.appendFileSync("log.txt", append, "utf-8");
		} catch (err) {
			console.log("Greska pri upisu u log:", err);
		}
	} else if (req.url === "/save") {
		const logContent = fs.readFileSync("log.txt", "utf8");
		res.writeHead(200, { "Content-Type": "text/plain" });
		try {
			res.end(logContent);
		} catch (err) {
			console.log("Greska pri citanju log.txta.", err);
		}
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("ERROR 404");
		console.log("404 Korisnik usao u nepostojecu stranu.");
	}
};
