import Axios from "axios";
import jwt_decode from "jwt-decode";


const	set = (token) => {
	localStorage.setItem("auth_token", token);
	Axios.defaults.headers.common["auth_token"] = `${token}`;
};

const	remove = () => {
	localStorage.removeItem("auth_token");
	Axios.defaults.headers.common["auth_token"] = null;
};

const	isExp = (dToken) => {
	if (!dToken)
		return (true);
	const	date	= new Date().getTime() / 1000;

	return (dToken.exp - date < 0);
};

const	get = () => {
	const	token	= localStorage.getItem("auth_token");
	const	dToken	= token && jwt_decode(token);

	return (isExp(dToken) ? null : dToken);
};

const	isAllowed = (allowedRoles = []) => {
	const	dToken = get();

	if (!dToken)
		return (false);
	if (allowedRoles.length < 1)
		return (true);
	for (let i = 0; i < allowedRoles.length; i++) {
		if (`${dToken.role}` === `${allowedRoles[i]}`)
			return (true);
	}
	return (false);
};

const	data = () => {
	const	token	= localStorage.getItem("auth_token");
	const	dToken	= token && jwt_decode(token);

	return ({ token, dToken, isExp : isExp(dToken) });
};

export {
	set,
	remove,
	isExp,
	get,
	isAllowed,
	data
}
