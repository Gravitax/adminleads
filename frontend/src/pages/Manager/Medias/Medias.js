import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import * as gd from "../../../modules/global_data";

import "./Medias.css";


function	Medias() {
	const	[mediasList, setMediasList] = useState([]);
	const	navigate = useNavigate();

	useEffect(() => {
		Axios.get("/medias/findAll")
			.then((response) => {
				setMediasList(response.data);
			});
	}, []);

	const	mediaDelete = (name) => {
		// faire une demande de confirmation
		Axios.delete(`/medias/delete/${name}`);

		// on actualise userList en supprimant l'email supprimé en database
		let	tmp = [];

		for (const [, v] of Object.entries(mediasList)) {
			if (v.name === name)
				continue ;
			tmp.push(v);
		}
		setMediasList(tmp);
	};

	const	mediaUpdate = (name) => {
		// navigate(`${gd.path_routes.account}?email=${email}`);
		console.log(name);
	};

	const	mediaInfo = (name) => {
		navigate(`${gd.path_routes.info_medias}?media=${name}`);
	};

	return (
		
		<div id="medias">
			<b className="create" onClick={() => navigate(gd.path_routes.create_medias)}> Create Media </b>
			<br /><br />
			<b> Medias list: </b>
			<br /><br />
			{
				mediasList.map((value) => {
					return (
						<div className="mediaCard" key={value.name}>
							<span className="mediaName"> {value.name} </span>
							<span className="mediaControls">
								<span onClick={() => mediaInfo(value.name)}>info</span>
								<span onClick={() => mediaUpdate(value.name)}>update</span>
								<span onClick={() => mediaDelete(value.name)}>delete</span>
							</span>
						</div>
					);
				})
			}
		</div>
	);
}


export default Medias;
