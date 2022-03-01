const	bcrypt	= require("bcryptjs");

const	db		= require("../models/init");
const	token	= require("../modules/token");


exports.delete = (req, res, next) => {
	const	email = req.params.email;

	if (!email) return ;
	db.User.destroy({ where : { email : email } })
		.then((response) => res.send(response))
		.catch(() => res.status(500));
};

exports.readAll = (req, res, next) => {
	db.User.findAll()
		.then((response) => {
			res.send(response);
		})
		.catch(() => res.status(500));
};

exports.read = (req, res, next) => {
	const	email = req.params.email;

	if (!email) return ;
	db.User.findOne({ where : { email : email } })
		.then((user) => {
			res.send(token(user));
		})
		.catch(() => res.status(500));
};

exports.update = (req, res, next) => {
	const	data		= req.body.data;

	if (!data) return ;
	if (data.new_password)
		data.new_password = bcrypt.hashSync(data.new_password, 10);

	const	new_user = {}
	if (data.new_email)		new_user.email		= data.new_email;
	if (data.new_password)	new_user.password	= data.new_password;
	if (data.new_role)		new_user.role		= data.new_role;

	db.User.update(new_user, { where : { email : data.email } })
		.then(() => {
			res.send({ message : `${data.new_email || data.email} updated succesfully`,
				token : token({
					email		: data.new_email	|| data.email,
					password	: data.new_password	|| data.password,
					role		: data.new_role		|| data.role,
				}),
			});
		})
		.catch(() => res.status(500));
};
