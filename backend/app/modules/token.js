const	jwt		= require("jsonwebtoken");


const	token	= (user) => {
	if (!user) return (null);
	const	user_data = {
		email		: user.email,
		password	: user.password,
		role		: user.role,
	}
	return (jwt.sign(user_data, `${process.env.AUTH_TOKEN}`, { expiresIn : `${60 * 60}s` }));
};


module.exports = token;
