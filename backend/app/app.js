const	express 	= require("express");
const	cors		= require("cors");


const	app = express();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", parameterLimit: 50000, extended: true, }));

const	cors_options = {
	origin					: "https://admin-lead.agence-markus.com",
	credentials				: true,
	// optionsSuccessStatus	: 200,
}
app.use(cors(cors_options));

const	db = require("./models/init");
db.sequelize.sync({ alter : true })
	.then((data) => {
		console.log(data);
	})
	.catch(e => console.log(e));
// db.sequelize.sync();

const	route_auth		= require("./routes/auth");
const	route_leads		= require("./routes/leads");
const	route_users		= require("./routes/users");
const	route_medias	= require("./routes/medias");
const	route_clients	= require("./routes/clients");
const	route_services	= require("./routes/services");

app.use("/auth", route_auth);
app.use("/leads", route_leads);
app.use("/users", route_users);
app.use("/medias", route_medias);
app.use("/clients", route_clients);
app.use("/services", route_services);


module.exports = app;
