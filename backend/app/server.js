const	http	= require("http");
const	dotenv	= require("dotenv");

const	app		= require("./app");


dotenv.config();

const	normalizePORT = (val) => {
	const	PORT = parseInt(val, 10);
	
	if (isNaN(PORT)) {
		return (val);
	}
	if (PORT >= 0) {
		return (PORT);
	} 
	return (false);
};

const	PORT = normalizePORT(process.env.PORT || "3000");

app.set("PORT", PORT);

const	errorHandler = (error) => {
	if (error.syscall !== "listen") {
		throw (error);
	}
	const address	= server.address();
	const bind		= typeof(address) === "string" ? "PIPE : " + address : "PORT : " + PORT;

	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges.");
			process.exit(1);
			break ;
		case "EADDRINUSE":
			console.error(bind + " is already in use.");
			process.exit(1);
			break ;
		default:
			throw (error);
	}
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.listen(PORT, () => {
	const address	= server.address();
	const bind		= typeof(address) === "string" ? "PIPE : " + address : "PORT : " + PORT;

	console.log("Listening on " + bind);
});
