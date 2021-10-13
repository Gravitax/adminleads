const	bcrypt	= require("bcrypt");

const	db		= require("../modules/db");
const	token	= require("../modules/token");


exports.delete = (req, res, next) => {
	const	username = req.params.username;

	if (!username) return ;

	try {
		db.query("DELETE FROM users WHERE username = ?", [username],
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

exports.read = (req, res, next) => {
	try {
		db.query("SELECT * FROM users",
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

exports.readOne = (req, res, next) => {
	const	username	= req.params.username;

	if (!username) return ;

	try {
		db.query("SELECT * FROM users WHERE username = ?", [username],
			(error, results) => {
				if (error) throw (error);
				res.send(token(results[0]));
			}
		);
	}
	catch {
		res.status(500);
	}
};

async function	update_query(data) {
	let	data_length = 0;

	for (let value in data) {
		if (data[value] && data[value].length > 0) ++data_length;
	}

	let	SQL_query = "UPDATE users SET";
	if (data.new_username) {
		SQL_query += ` username = "${data.new_username}"`;
		SQL_query += `${data_length-- > 3 ? ',' : ''}`;
	}
	if (data.new_password) {
		data.new_password = await bcrypt.hash(data.new_password, 10);

		SQL_query += ` password = "${data.new_password}"`;
		SQL_query += `${data_length-- > 3 ? ',' : ''}`;
	}
	if (data.new_role) {
		SQL_query += ` role = "${data.new_role}"`;
		SQL_query += `${data_length-- > 3 ? ',' : ''}`;
	}
	SQL_query += ` WHERE username = "${data.username}"`;

	return (SQL_query);
}

exports.update = async (req, res, next) => {
	const	data		= req.body.data;

	if (!data) return ;

	let	SQL_query = await update_query(data);

	try {
		db.query(SQL_query,
			(error, results) => {
				if (error) throw (error);
				res.send( { message : `${data.new_username || data.username} updated succesfully`, token : token({
						username	: data.new_username || data.username,
						password	: data.new_password || data.password,
						role		: data.new_role || data.role,
					}),
				});
			}
		);
	}
	catch {
		res.status(500);
	}
};
