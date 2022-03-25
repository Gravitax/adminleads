import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";


import * as gd from "../../../../modules/global_data";
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

	const	service_goto = (name) => {
		navigate(`${gd.path_routes.info_services}?service=${name}`);
	};

	const	service_delete = (name) => {
		// faire une demande de confirmation
		Axios.delete(`/services/delete/${name}`);

		// on actualise userList en supprimant l'email supprimé en database
		let	tmp = [];

		for (const [, v] of Object.entries(services)) {
			if (v.name === name)
				continue ;
			tmp.push(v);
		}
		setServices(tmp);
	};

	return (
		<div id="infoMedias">
			Media's name : {media.name}
			<br /><br />
			Service's list :
			<br />
			{services.length > 0 &&
				services.map((service) => {
					return (<div className="service_line">
						{service.name}
						<span>
							<span onClick={() => service_goto(service.name)}>GOTO</span>
							<span onClick={() => service_delete(service.name)}>DELETE</span>
						</span>
					</div>);
				})
			}
		</div>
	);
}


export default InfoMedias;
