const	express 		= require("express");
const	path			= require("path");
const	cors			= require("cors");

const	authRoutes		= require("../routes/auth");
const	usersRoutes		= require("../routes/users");

const	app 			= express();


// cors to allow cross origin request
app.use(cors({
	origin		: ["http://localhost:3000"],
	methods		: ["GET", "POST"],
	credentials	: true,
}));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, }));
// parse application/json
app.use(express.json());

// set the front as static repository
app.use(express.static("../frontend/build"));

// déclaration des différentes routes de l'API
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// redirect api path to front path
app.get("/*", (req, res, next) => {
	res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});


module.exports = app;
