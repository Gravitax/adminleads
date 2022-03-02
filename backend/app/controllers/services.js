const	db		= require("../models/init");


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
