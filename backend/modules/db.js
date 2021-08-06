const	mysql	= require("mysql");


const	db		= mysql.createConnection({
	host		: "localhost",
	port		: "8889",
	user		: "maboye",
	password	: "maboye",
	database	: "adminleads"
});


module.exports = db;
