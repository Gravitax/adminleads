const	jwt = require("jsonwebtoken");


const	token = (user) => {
	if (!user) return (null);
	return (jwt.sign({
		username	: user.username,
		password	: user.password,
		role		: user.role,
		exp			: Math.floor(Date.now() / 1000) + (60 * 60),
	}, process.env.AUTH_TOKEN));
}


module.exports = token;
