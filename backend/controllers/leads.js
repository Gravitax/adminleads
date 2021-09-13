const	db		= require("../modules/db");


exports.readAll = (req, res, next) => {
	try {
		db.query("SELECT * FROM lead",
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

exports.readQuery = (req, res, next) => {
	let	data		= req.query.subData || req.body.subData;
	
	data = JSON.parse(data);

	let	flux		= data.destinataires;
	let	dispositif	= data.provenances;
	let	dateStart	= data.dateStart?.split("T")[0];
	let	dateEnd		= data.dateEnd?.split("T")[0];
	let query 		= "SELECT * FROM lead";

	if (flux || dispositif || dateStart || dateEnd) {
		query += " WHERE";
		if (flux)					query += ` flux = '${flux.id}'`;
		if (flux && dispositif)		query += " AND";
		if (dispositif)				query += ` dispositif = '${dispositif.id}'`;

		if ((flux || dispositif) && (dateStart || dateEnd))
			query += " AND";
		if (dateStart)				query += ` timestamp >= '${dateStart}'`;
		if (dateStart && dateEnd)	query += " AND";
		if (dateEnd)				query += ` timestamp <= '${dateEnd}'`;
	}

	console.log(query);

	try {
		db.query(query,
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

exports.readDestinataires = (req, res, next) => {
	try {
		db.query("SELECT * FROM flux WHERE 1",
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

exports.readProvenances = (req, res, next) => {
	try {
		db.query("SELECT * FROM dispositif WHERE 1",
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
