const	db	= require("../models/init");
const	Op	= db.Sequelize.Op;


function	get_id_list(list) {
	let	id_list = [];

	list.forEach((elt) => {
		id_list.push(elt?.id);
	});
	return (id_list);
}

function	delete_leads(req, res, next, id_list) {
	db.Lead.destroy({ where : { id : id_list } })
		.then(() => {
			res.status(204).end();
		})
		.catch(() => res.status(500));
}

exports.update = (req, res, next) => {
	let	data	= req.query.data || req.body.data;
	let	status	= req.query.status || req.body.status;
	
	if (!data || !status) return ;

	let	action	= status.action;
	let	id_list	= get_id_list(data.selected);
	let	query	= null;
	
	if (action ===  "Anonymiser")		query = { telephone : "PHONE", email : "EMAIL" };
	else if (action ===  "Accepter")	query = { accepte : 1 };
	else if (action ===  "Rejeter")		query = { accepte : 0 };
	else if (action ===  "Supprimer")	delete_leads(req, res, next, id_list);

	if (!query) return ;
	db.Lead.update(query, { where : { id : id_list } })
		.then((response) => {
			res.send(response);
		})
		.catch(() => res.status(500));
}

exports.findAll = (req, res, next) => {
	db.Lead.findAll()
		.then((response) => {
			res.send(response);
		})
		.catch(() => res.status(500));
};

exports.findQuery = (req, res, next) => {
	let	data = req.query.subData || req.body.subData;
	
	data = JSON.parse(data);
	if (!data) return ;

	let	dateStart, dateEnd, query = {};

	if (data.dateStart)
		dateStart = `${data.dateStart}`.split('T')[0];
	if (data.dateEnd)
		dateEnd = `${data.dateEnd}`.split('T')[0];

	if (data.client)
		query.client = parseInt(data.client, 10);
	if (data.media)
		query.media = parseInt(data.media, 10);
	if (data.status && data.status !== "All")
		query.accepte = data.status === "Valid" ? 1 : 0;
	
	if (dateStart)	query.timestamp = { [Op.gt] : dateStart }
	if (dateEnd)	query.timestamp = { [Op.lt] : dateEnd }
	if (dateStart && dateEnd)
		query.timestamp = { [Op.between] : [dateStart, dateEnd] }

	db.Lead.findAll({ where : query })
		.then((response) => {
			res.send(response);
		})
		.catch(() => res.status(500));
}
