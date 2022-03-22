const	db		= require("../models/init");


exports.findAll = (req, res, next) => {
	db.Client.findAll()
		.then((response) => {
			res.send(response);
		})
		.catch(() => res.status(500));
};

exports.findOne = (req, res, next) => {
	const	name = req.params.name;

	if (!name) return ;
	db.Client.findOne({ where : { name : name } })
		.then((reponse) => {
			res.send(reponse);
		})
		.catch(() => res.status(500));
};

exports.delete = (req, res, next) => {
	const	name = req.params.name;

	if (!name) return ;
	db.Client.destroy({ where : { name : name } })
		.then((response) => {
			res.send(response);
		})
		.catch(() => res.status(500));
};

exports.create = (req, res, next) => {
	const	name = req.body.name, service = req.body.service;

	if (!name) return ;
	db.Client.findOne({ where : { name : name } })
		.then(async (client) => {
			// on verifie que l'user n'est pas déjà dans la DB
			if (client?.name?.length > 0) {
				res.json({ message: `client: " ${name} " already exist` });
			}
			else {
				// si ce n'est pas le cas on peut l'insert
				const	c	= await db.Client.create({ name });

				if (service) {
					const	s = await db.Service.findOne({ where : { name : service } });

					await c.addService(s);
				}
				res.json({ message: `client: " ${name} " has been created.` });
			}
		})
		.catch(() => res.status(500));
};
