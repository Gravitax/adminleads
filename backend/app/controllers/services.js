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
	const	name = req.body.name, media = req.body.media, client = req.body.client;

	if (!name || !media || !client) return ;
	db.Service.findOne({ where : { name : name } })
		.then(async (service) => {
			// on verifie que le service n'est pas déjà dans la DB
			if (service?.name?.length > 0) {
				res.json({ message: `service: " ${name} " already exist` });
			}
			else {
				// si ce n'est pas le cas on peut l'insert
				const	s	= await db.Service.create({ name, media, client });
				const	c	= await db.Client.findOne({ where : { name : client } });
				const	m	= await db.Media.findOne({ where : { name : media } });

				await s.addClient(c);
				await s.addMedia(m);
				res.json({ message: `service: " ${name} " has been created.` });
			}
		})
		.catch(() => res.status(500));
};
