const	db		= require("../models/init");


exports.findAll = (req, res, next) => {
	db.Media.findAll()
		.then((response) => {
			res.send(response);
		})
		.catch(() => res.status(500));
};
