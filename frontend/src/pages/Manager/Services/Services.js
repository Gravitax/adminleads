import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import * as gd from "../../../modules/global_data";

import "./Services.css";


function	Services() {
	const	[servicesList, setServicesList] = useState([]);
	const	navigate = useNavigate();

	useEffect(() => {
		Axios.get("/services/findAll")
			.then((response) => {
				setServicesList(response.data);
			});
	}, []);

	const	serviceDelete = (name) => {
		// faire une demande de confirmation
		Axios.delete(`/services/delete/${name}`);

		// on actualise userList en supprimant l'email supprimé en database
		let	tmp = [];

		for (const [, v] of Object.entries(servicesList)) {
			if (v.name === name)
				continue ;
			tmp.push(v);
		}
		setServicesList(tmp);
	};

	const	serviceUpdate = (name) => {
		// navigate(`${gd.path_routes.account}?email=${email}`);
		console.log(name);
	};

	const	serviceInfo = (name) => {
		navigate(`${gd.path_routes.info_services}?service=${name}`);
	};

	return (
		
		<div id="services">
			<b className="create" onClick={() => navigate(gd.path_routes.create_services)}> Create Service </b>
			<br /><br />
			<b> Services list: </b>
			<br /><br />
			{
				servicesList.map((value) => {
					return (
						<div className="serviceCard" key={value.name}>
							<span className="serviceName"> {value.name} </span>
							<span className="serviceControls">
								<span onClick={() => serviceInfo(value.name)}>info</span>
								<span onClick={() => serviceUpdate(value.name)}>update</span>
								<span onClick={() => serviceDelete(value.name)}>delete</span>
							</span>
						</div>
					);
				})
			}
		</div>
	);
}


export default Services;
