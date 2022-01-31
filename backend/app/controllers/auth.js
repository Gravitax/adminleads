const	bcrypt	= require("bcryptjs");

const	db		= require("../modules/db");
const	token	= require("../modules/token");


exports.login = (req, res, next) => {
	const	username	= req.body.username;
	const	password	= req.body.password;

	if (!username || !password) return ;
	db.query("SELECT * FROM users WHERE username = ?", [username],
		(error, results) => {
			if (error) res.status(500);
			if (results && results.length > 0) {
				// on compare le mdp en clair et le mdp hash
				if (bcrypt.compareSync(password, results[0].password))
					res.json({ message: `user: " ${username} " logged in`, token : token(results[0]) });
				else
					res.json({ message: `user: " ${username} " unvalid password` } );
			}
			else {
				res.json({ message: `user: " ${username} " not found` });
			}
		}
	);
};

exports.register = async (req, res, next) => {
	const	username	= req.body.username;
	const	password	= req.body.password;

	if (!username || !password) return ;
	// on verifie que l'user n'est pas déjà dans la DB
	db.query("SELECT username FROM users WHERE username = ?", [username],
		(error, results) => {
			if (error) res.status(500);
			if (results && results.length > 0) {
				res.json({ message: `user: " ${username} " already exist`, exist: true });
			}
			else {
				// si ce n'est pas le cas on peut l'insert
				db.query("INSERT INTO users (username, password, role) VALUES (?, ?, 1)",
					[username, bcrypt.hashSync(password, 10)],
					(error) => {
						if (error) res.status(500);
						res.json({ message: `user: " ${username} " registered succesfully` });
					},
				);
			}
		}
	);
};
