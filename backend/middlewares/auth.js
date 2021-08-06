const	jwt		= require("jsonwebtoken");


module.exports = (req, res, next) => {
	try {
		const	token	= req.query.token || req.body.token;

		if (token && jwt.verify(token, process.env.AUTH_TOKEN))
			next();
	}
	catch (error) {
		res.status(401).json({ error : error });
	}
};
