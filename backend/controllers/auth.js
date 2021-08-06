const	bcrypt	= require("bcrypt");

const	db		= require("../modules/db");
const	token	= require("../modules/token");


exports.login = (req, res, next) => {
	const	username	= req.body.username;
	const	password	= req.body.password;

	if (!username || !password)
		return ;
	try {
		// on selectionne l'user dans la DB
		db.query("SELECT * FROM users WHERE username = ?", [username],
			(error, results) => {
				if (error) throw (error);
				if (results && results.length > 0) {
					// on compare le pwd crypté avec celui en DB
					bcrypt.compare(password, results[0].password)
						.then((response) => {
							if (response) {
								res.json({ message: `user: " ${username} " logged in`, token: token(results[0]), });
							}
							else {
								res.json({ message: `user: " ${username} " unvalid password` } );
							}
						})
						.catch((error) => {
							res.status(500).json({ error });
						});
				}
				else {
					res.json({ message: `user: " ${username} " not found` });
				}
			}
		);
	}
	catch {
		res.status(500);
	}
};

exports.register = async (req, res, next) => {
	const	username	= req.body.username;
	const	password	= req.body.password;

	if (!username || !password)
		return ;
	try {
		const	hashedPassword = await bcrypt.hash(password, 10);

		// on verifie que l'user n'est pas déjà dans la DB
		db.query("SELECT username FROM users WHERE username = ?", [username],
			(error, results) => {
				if (error) throw (error);
				if (results && results.length > 0) {
					res.json({ message: `user: " ${username} " already exist`, exist: true, });
				}
				else {
					// si ce n'est pas le cas on peut l'insert
					db.query("INSERT INTO users (username, password, role) VALUES (?, ?, 0)", [username, hashedPassword],
						(error) => {
							if (error) throw (error);
							res.json({ message: `user: " ${username} " registered succesfully` });
						},
					);
				}
			}
		);
	}
	catch {
		res.status(500);
	}
};
