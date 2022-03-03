const	db		= require("../models/init");


exports.findAll = (req, res, next) => {
	db.Media.findAll()
		.then((response) => {
			res.send(response);
		})
		.catch(() => res.status(500));
};

exports.findOne = (req, res, next) => {
	const	name = req.params.name;

	if (!name) return ;
	db.Media.findOne({ where : { name : name } })
		.then((reponse) => {
			res.send(reponse);
		})
		.catch(() => res.status(500));
};

exports.delete = (req, res, next) => {
	const	name = req.params.name;

	if (!name) return ;
	db.Media.destroy({ where : { name : name } })
		.then((response) => {
			res.send(response);
		})
		.catch(() => res.status(500));
};

exports.create = (req, res, next) => {
	const	name = req.body.name;

	if (!name) return ;
	db.Media.findOne({ where : { name : name } })
		.then((media) => {
			// on verifie que l'user n'est pas déjà dans la DB
			if (media?.name?.length > 0) {
				res.json({ message: `media: " ${name} " already exist` });
			}
			else {
				// si ce n'est pas le cas on peut l'insert
				db.Media.create({
					name	: name,
				});
				res.json({ message: `media: " ${name} "has been created.` });
			}
		})
		.catch(() => res.status(500));
};
