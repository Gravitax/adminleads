import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";


import { extractParamsUrl } from "../../../../modules/functions";

import "./InfoClients.css";


function	InfoClients() {
	const	location	= useLocation();
	const	navigate	= useNavigate();
	const	get_params	= extractParamsUrl(location?.search);

	const	[client, setClient]		= useState({ name : get_params["client"] });
	const	[services, setServices]	= useState([]);

	useEffect(() => {
		// si pas de service on retourne à la page précedente
		if (!client.name)
			navigate(-1);
		// on recup le service de get_params
		Axios.get(`/clients/findOne/${client.name}`)
			.then((response) => {
				setClient(response.data);
			});
		Axios.get(`/clients/findServices/${client.name}`)
			.then((response) => {
				setServices(response.data);
			});
	}, [client]);

	return (
		<div id="infoClients">
			Client's name : {client.name}
			<br /><br />
			Service's list :
			<br />
			{services.length > 0 &&
				services.map((service) => <p>{service.name}</p>)
			}
		</div>
	);
}


export default InfoClients;