const	bcrypt	= require("bcryptjs");

const	db		= require("../models/init");
const	token	= require("../modules/token");


exports.login = (req, res, next) => {
	const	email		= req.body.email;
	const	password	= req.body.password;

	if (!email || !password) return ;
	db.User.findOne({ where : { email : email } })
		.then((user) => {
			if (bcrypt.compareSync(password, user.password))
				res.json({ message: `user: " ${email} " logged in`, token : token(user) });
			else
				res.json({ message: `user: " ${email} " unvalid password` } );
		})
		.catch(() => {
			res.json({ message: `user: " ${email} " not found` });
		});
};

exports.register = (req, res, next) => {
	const	email		= req.body.email;
	const	password	= req.body.password;
	const	role		= req.body.role;

	if (!email || !password) return ;
	db.User.findOne({ where : { email : email } })
		.then((user) => {
			// on verifie que l'user n'est pas déjà dans la DB
			if (user?.email?.length > 0) {
				res.json({ message: `user: " ${email} " already exist` });
			}
			else {
				// si ce n'est pas le cas on peut l'insert
				db.User.create({
					email		: email,
					password	: bcrypt.hashSync(password, 10),
					role		: role,
				});
				res.json({ message: `user: " ${email} "has been created.` });
			}
		})
		.catch(() => res.status(500));
};
