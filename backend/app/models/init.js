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


module.exports = db;
