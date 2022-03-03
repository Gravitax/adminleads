const	db		= require("../models/init");


exports.findAll = (req, res, next) => {
	db.Service.findAll()
		.then((response) => {
			res.send(response);
		})
		.catch(() => res.status(500));
};

exports.findOne = (req, res, next) => {
	const	name = req.params.name;

	if (!name) return ;
	db.Service.findOne({ where : { name : name } })
		.then((reponse) => {
			res.send(reponse);
		})
		.catch(() => res.status(500));
};

exports.delete = (req, res, next) => {
	const	name = req.params.name;

	if (!name) return ;
	db.Service.destroy({ where : { name : name } })
		.then((response) => {
			res.send(response);
		})
		.catch(() => res.status(500));
};

exports.create = (req, res, next) => {
	const	name = req.body.name;

	if (!name) return ;
	db.Service.findOne({ where : { name : name } })
		.then((service) => {
			// on verifie que l'user n'est pas déjà dans la DB
			if (service?.name?.length > 0) {
				res.json({ message: `service: " ${name} " already exist` });
			}
			else {
				// si ce n'est pas le cas on peut l'insert
				db.Service.create({
					name	: name,
				});
				res.json({ message: `service: " ${name} "has been created.` });
			}
		})
		.catch(() => res.status(500));
};
