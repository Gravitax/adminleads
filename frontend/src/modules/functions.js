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

export const	get_date = (data = {}, separator = '-') => {
	let	newDate	= new Date()
	let	date	= newDate.getDate() + data?.day;
	let	month	= newDate.getMonth() + data?.month;
	let	year	= newDate.getFullYear() + data?.year;

	date = date < 0 ? 0 : date;
	month = month < 0 ? 0 : month;
	return (`${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`);
}
