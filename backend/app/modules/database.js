const	Sequelize = require("sequelize");


const	sequelize = new Sequelize(
	"adminleads",
	"dispositifs",
	"dispositifs",
	{
		dialect	: "mysql",
		host	: "localhosts",
	}
);


module.exports = sequelize;
