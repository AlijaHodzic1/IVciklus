const http = require("http");
const routes = require("./routes2");

const server = http.createServer(routes.handleRequests);

server.listen(4000, () => {
	console.log("Server radi na URL-u http://localhost:4000");
});
