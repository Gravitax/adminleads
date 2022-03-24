import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";


import { extractParamsUrl } from "../../../../modules/functions";

import "./InfoServices.css";


function	InfoServices() {
	const	location	= useLocation();
	const	navigate	= useNavigate();
	const	get_params	= extractParamsUrl(location?.search);

	const	[service, setService] = useState({ name : get_params["service"] })

	useEffect(() => {
		// si pas de service on retourne à la page précedente
		if (!service.name)
			navigate(-1);
		// on recup le service de get_params
		Axios.get(`/services/findOne/${service.name}`)
			.then((response) => {
				setService(response.data);
			});
	}, [service]);

	return (
		<div>
			Service's name : {service.name}
			<br />
			Media : {service.media}
			<br />
			Client : {service.client}
		</div>
	);
}


export default InfoServices;
