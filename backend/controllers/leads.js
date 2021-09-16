const	db		= require("../modules/db");


function	getID(selected) {
	let	arr = [];

	selected.forEach((tmp) => {
		arr.push(tmp?.id);
	});
	return (arr);
}

exports.update = (req, res, next) => {
	let	data	= req.query.data || req.body.data;
	let	status	= req.query.status || req.body.status;

	if (!data || !status) return ;

	let	query = "SELECT * FROM lead";
	query += ` WHERE id IN (${getID(data.selected).join(',')})`;

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
}

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
	let	data = req.query.subData || req.body.subData;
	
	data = JSON.parse(data);
	if (!data) return ;

	let	dateStart	= data.dateStart?.split("T")[0];
	let	dateEnd		= data.dateEnd?.split("T")[0];
	let	flux		= data.destinataires;
	let	dispositif	= data.provenances;
	let	status		= data.status?.status;
	let query 		= "SELECT * FROM lead";

	if (status === "All") status = null;
	if (status)
		status = status === "Valid" ? 1 : -1;

	if (dateStart || dateEnd || flux || dispositif || status) {
		query += " WHERE";

		if (dateStart)				query += ` timestamp >= '${dateStart}'`;
		if (dateStart && dateEnd)	query += " AND";
		if (dateEnd)				query += ` timestamp <= '${dateEnd}'`;

		if ((flux || dispositif) && (dateStart || dateEnd))
			query += " AND";
		if (flux)					query += ` flux = '${flux.id}'`;
		if (flux && dispositif)		query += " AND";
		if (dispositif)				query += ` dispositif = '${dispositif.id}'`;

		if (status && (dateStart || dateEnd || flux || dispositif))
			query += " AND";
		if (status)					query += ` accepte = '${status === 1 ? 1 : 0}'`;
	}

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
