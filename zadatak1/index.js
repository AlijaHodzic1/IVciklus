const http = require("http");
const fs = require("fs");
const routes = require("./routes.js");

const server = http.createServer(routes.handleRequest);

server.listen(3000, () => {
	console.log("Server pokrenut na portu 3000.");
});
