const	db		= require("../models/init");


exports.findAll = (req, res, next) => {
	db.Client.findAll()
		.then((response) => {
			res.send(response);
		})
		.catch(() => res.status(500));
};
