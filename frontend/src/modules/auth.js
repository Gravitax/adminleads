import Axios from "axios";
import jwt_decode from "jwt-decode";


export const	set = (token) => {
	localStorage.setItem("auth_token", token);
	Axios.defaults.headers.common["auth_token"] = `${token}`;
};

export const	remove = () => {
	localStorage.removeItem("auth_token");
	Axios.defaults.headers.common["auth_token"] = null;
};

export const	isExp = (dToken) => {
	if (!dToken)
		return (true);
	const	date	= new Date().getTime() / 1000;

	return (dToken?.exp - date < 0);
};

export const	get = () => {
	const	token	= localStorage.getItem("auth_token");
	const	dToken	= token && jwt_decode(token);

	return (isExp(dToken) ? null : dToken);
};

export const	isAllowed = (allowedRoles = []) => {
	let	dToken = get();
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

export const	data = () => {
	const	token	= localStorage.getItem("auth_token");
	const	dToken	= token && jwt_decode(token);

	return ([token, dToken, isExp(dToken)]);
};
