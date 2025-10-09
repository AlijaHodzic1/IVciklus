const fs = require("fs");
fs.writeFileSync("log.txt", "Fajl za log.   ");

exports.handleRequest = (req, res) => {
	if (req.url === "/") {
		res.end("dobro dosli u home stranicu");
		console.log("Korisnik usao u home stranicu");
		fs.appendFile("./log.txt", "Korisnik usao u home stranicu   ", (err) => {
			if (err) {
				console.log("greska u pisanju fajla");
			}
		});
	} else if (req.url === "/about") {
		res.end("dobro dosli u about us stranicu");
		console.log("Korisnik usao u 'o nama' stranicu");
		fs.appendFile(
			"./log.txt",
			"Korisnik usao u 'o nama' stranicu   ",
			(err) => {
				if (err) {
					console.log("greska u pisanju fajla");
				}
			}
		);
	} else {
		res.statusCode = 404;
		res.end("ERROR 404");
		console.log(404);
	}
};
