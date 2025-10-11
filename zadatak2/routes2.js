const data = require("./data");
const path = require("path");

exports.handleRequests = (req, res) => {
	if (req.url === "/") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("Ovo je server 2.");
	} else if (req.url === "/data") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(data.korisnici));
	} else if (req.url === "/path") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end(path.join(__dirname, "data.js"));
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("ERROR 404");
		console.log("404 Korisnik usao u nepostojecu stranu.");
	}
};
