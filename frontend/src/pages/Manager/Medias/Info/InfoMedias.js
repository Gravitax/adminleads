import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";


import { extractParamsUrl } from "../../../../modules/functions";

import "./InfoMedias.css";


function	InfoMedias() {
	const	location	= useLocation();
	const	navigate	= useNavigate();
	const	get_params	= extractParamsUrl(location?.search);

	const	[media, setMedia]		= useState({ name : get_params["media"] });
	const	[services, setServices]	= useState([]);

	useEffect(() => {
		// si pas de service on retourne à la page précedente
		if (!media.name)
			navigate(-1);
		// on recup le service de get_params
		Axios.get(`/medias/findOne/${media.name}`)
			.then((response) => {
				setMedia(response.data);
			});
		Axios.get(`/medias/findServices/${media.name}`)
			.then((response) => {
				setServices(response.data);
			});
	}, []);

	return (
		<div id="infoMedias">
			Media's name : {media.name}
			<br /><br />
			Service's list :
			<br />
			{services.length > 0 &&
				services.map((service) => <p>{service.name}</p>)
			}
		</div>
	);
}


export default InfoMedias;
