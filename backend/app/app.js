const	express = require("express");
const	cors	= require("cors");


const	app = express();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", parameterLimit: 50000, extended: true, }));

const	cors_options = {
	origin					: "https://admin-lead.agence-markus.com",
	credentials				: true,
	// optionsSuccessStatus	: 200,
}
app.use(cors(cors_options));

const	route_auth	= require("./routes/auth");
const	route_leads	= require("./routes/leads");
const	route_users	= require("./routes/users");

app.use("/auth", route_auth);
app.use("/leads", route_leads);
app.use("/users", route_users);


module.exports = app;
