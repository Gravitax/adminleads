import * as auth from "./auth";


const	path_routes = {
	"login"		: "/",
	"home"		: "/private",
	"leads"		: "/private/leads",
	"account"	: "/private/account",
	"users"		: "/private/users",
	"register"	: "/private/users/register"
};

const	roles = {
	"Admin"		: 0,
	"Markus"	: 1,
	"Media"		: 2,
	"Client"	: 3,
};


export {
	path_routes,
	roles,
	auth
};
