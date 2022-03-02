const	db = {};

db.Sequelize = require("sequelize");
db.sequelize = new db.Sequelize(
	"adminleads",
	"dispositifs",
	"dispositifs",
	{
		host	: "localhost",
		dialect	: "mysql",
	}
);

db.User		= require("./User")(db.Sequelize, db.sequelize);

db.Lead		= require("./Lead")(db.Sequelize, db.sequelize);
db.Media	= require("./Media")(db.Sequelize, db.sequelize);
db.Client	= require("./Client")(db.Sequelize, db.sequelize);
db.Service	= require("./Service")(db.Sequelize, db.sequelize);


module.exports = db;
