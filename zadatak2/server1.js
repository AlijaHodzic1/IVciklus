const http = require("http");
const routes = require("./routes1");

const server = http.createServer(routes.handleRequests);

server.listen(3000, () => {
	console.log("Server radi na URL-u http://localhost:3000");
});
