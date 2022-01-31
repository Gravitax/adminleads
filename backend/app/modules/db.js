const	mysql	= require("mysql");


const	db		= mysql.createConnection({
	host		: "localhost",
	port		: "3306",
	user		: "dispositifs",
	password	: "dispositifs",
	database	: "adminleads"
});


module.exports = db;
