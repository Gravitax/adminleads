const	Sequelize	= require("sequelize");
const	sequelize	= require("../modules/database.js");


const	Users = sequelize.define("users", {
	id			: {
		type			: Sequelize.INTEGER,
		autoIncrement	: true,
		allowNull		: false,
		primaryKey		: true
	},
	email		: {
		type			: Sequelize.STRING,
		allowNull		: false
	},
	password	: {
		type			: Sequelize.STRING,
		allowNull		: false
	}
});


module.exports = Users;
