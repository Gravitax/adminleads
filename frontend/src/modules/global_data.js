import * as auth from "./auth";


const	path_routes = {
	"login"				: "/",
	"home"				: "/private",
	"leads"				: "/private/leads",
	"account"			: "/private/account",
	"manager"			: "/private/manager",
	"medias"			: "/private/manager/medias",
	"create_medias"		: "/private/manager/medias/create",
	"info_medias"		: "/private/manager/medias/info",
	"clients"			: "/private/manager/clients",
	"create_clients"	: "/private/manager/clients/create",
	"info_clients"		: "/private/manager/clients/info",
	"services"			: "/private/manager/services",
	"create_services"	: "/private/manager/services/create",
	"info_services"		: "/private/manager/services/info",
	"users"				: "/private/manager/users",
	"register"			: "/private/manager/users/create",
	"update_users"		: "/private/manager/users/update",
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
