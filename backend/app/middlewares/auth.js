const	jwt		= require("jsonwebtoken");


module.exports = (req, res, next) => {
	jwt.verify(`${req.headers["auth_token"]}`, `${process.env.AUTH_TOKEN}`,
		(error, user) => {
			if (error) res.status(401);
			req.user = user;
			next();
		});
};
