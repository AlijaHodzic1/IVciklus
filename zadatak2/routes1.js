const os = require("os");
const data = require("./data");

exports.handleRequests = (req, res) => {
	if (req.url === "/") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("Ovo je server 1.");
	} else if (req.url === "/data") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(data.knjige));
	} else if (req.url === "/info") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		const freemem = os.freemem();
		res.end(`Free space on your PC: ${freemem} bytes`);
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("ERROR 404");
		console.log("404 Korisnik usao u nepostojecu stranu.");
	}
};
