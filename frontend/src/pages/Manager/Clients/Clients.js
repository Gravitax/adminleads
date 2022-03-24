import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import * as gd from "../../../modules/global_data";

import "./Clients.css";


function	Clients() {
	const	[clientsList, setClientsList] = useState([]);
	const	navigate = useNavigate();

	useEffect(() => {
		Axios.get("/clients/findAll")
			.then((response) => {
				setClientsList(response.data);
			});
	}, []);

	const	clientDelete = (name) => {
		// faire une demande de confirmation
		Axios.delete(`/clients/delete/${name}`);

		// on actualise userList en supprimant l'email supprimé en database
		let	tmp = [];

		for (const [, v] of Object.entries(clientsList)) {
			if (v.name === name)
				continue ;
			tmp.push(v);
		}
		setClientsList(tmp);
	};

	const	clientUpdate = (name) => {
		// navigate(`${gd.path_routes.account}?email=${email}`);
		console.log(name);
	};

	const	clientInfo = (name) => {
		navigate(`${gd.path_routes.info_clients}?client=${name}`);
	};

	return (
		
		<div id="clients">
			<b className="create" onClick={() => navigate(gd.path_routes.create_clients)}> Create Client </b>
			<br /><br />
			<b> Clients list: </b>
			<br /><br />
			{
				clientsList.map((value) => {
					return (
						<div className="clientCard" key={value.name}>
							<span className="clientName"> {value.name} </span>
							<span className="clientControls">
								<span onClick={() => clientInfo(value.name)}>info</span>
								<span onClick={() => clientUpdate(value.name)}>update</span>
								<span onClick={() => clientDelete(value.name)}>delete</span>
							</span>
						</div>
					);
				})
			}
		</div>
	);
}


export default Clients;
