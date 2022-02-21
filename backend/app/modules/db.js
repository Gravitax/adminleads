const	Sequelize = require("sequelize");


const	sequelize = new Sequelize(
	"adminleads",
	"dispositifs",
	"dispositifs",
	{
		host	: "localhost",
		dialect	: "mysql",
	}
);


module.exports = sequelize;
