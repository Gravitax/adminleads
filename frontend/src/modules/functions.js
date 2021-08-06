import jwt_decode from "jwt-decode";


export const	regex_username	= (username) => {
	const	regex	= /^[0-9A-ZÀÁÂÄÇÈÉÊËÌÍÎÏÑÒÓÔÖÙÚÛÜa-zàáâäçèéêëìíîïñòóôöùúûü-]{2,}$/;

	return (regex.test(username));
}

export const	regex_password	= (password) => {
	return (password.length > 3);
}

export const	extractParamsUrl = (chaineGET) => {
	let	result	= {};
	
	chaineGET = chaineGET.split('&');
	chaineGET.forEach((el) => {
		let	param = el.split('=');
		
		param[0] = param[0].replace('?', '');
		result[param[0]] = param[1];
	});
	return (result);
}

/**
*  @param {boolean} logged
*  @param {number} role
*/

export const	check_page_access = (logged = undefined, role = undefined) => {
	const	token	= localStorage.getItem("auth_token");
	const	dToken	= token && jwt_decode(token);
	
	if (logged === undefined)
		return (true);
	if (dToken && logged === false)
		return (false);
	if (!dToken && logged === true)
		return (false);
	if (role === undefined)
		return (true);
	if (!dToken || dToken.role !== role)
		return (false);
	return (true);
};
