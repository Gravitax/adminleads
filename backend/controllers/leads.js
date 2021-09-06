const	db		= require("../modules/db");


exports.read = (req, res, next) => {
	try {
		db.query("SELECT * FROM leads",
			(error, results) => {
				if (error) throw (error);
				res.send(results);
			}
		);
	}
	catch {
		res.status(500);
	}
};
