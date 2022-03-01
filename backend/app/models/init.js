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

db.User = require("./User")(db.Sequelize, db.sequelize);

db.Lead			= require("./Lead")(db.Sequelize, db.sequelize);
db.Dispositif	= require("./Dispositif")(db.Sequelize, db.sequelize);
db.Flux			= require("./Flux")(db.Sequelize, db.sequelize);


module.exports = db;
