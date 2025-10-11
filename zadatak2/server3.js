const http = require("http");
const routes = require("./routes3");

const server = http.createServer(routes.handleRequests);

server.listen(5000, () => {
	console.log("Server radi na URL-u http://localhost:5000");
});
