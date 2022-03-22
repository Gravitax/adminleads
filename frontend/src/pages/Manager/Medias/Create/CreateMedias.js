import React, { useState, useEffect } from "react";
import Axios from "axios";

import { regex_username } from "../../../../modules/functions";

import "./CreateMedias.css";


function	CreateMedias() {
	const	[name, setName]						= useState("");
	const	[service, setService]				= useState("");
	const	[creationStatus, setCreationStatus]	= useState("");

	const	[services, setServices]	= useState([]);
	
	const	mediaCreation = (e) => {
		e.preventDefault();
		if (!regex_username(name)) {
			setCreationStatus("name is invalid");
			return ;
		}
		Axios.post("/medias/create", { name, service })
			.then((response) => {
				setCreationStatus(response.data.message);
			});
	};

	useEffect(() => {
		Axios.get("/services/findAll")
			.then((response) => {
				setServices(response.data);
			});
	}, []);

	return (
		<div id="create_medias">
			<h1>Create Medias</h1>
			<form>

				<input type="text" name="name" placeholder="nom" autoComplete="off"
					onChange={(e) => setName(e.target.value)}
				/>
				{services.length > 0 &&
					<select onChange={(e) => setService(e.target.value)}>
						<option value=""> Services </option>
						{
							Object.entries(services).map(([, value]) => {
								return (
									<option value={value.name}> {value.name} </option>
								);
							})
						}
					</select>}
				<button onClick={mediaCreation}>CREATE</button>
				
				<p> {creationStatus} </p>

			</form>
		</div>
	);
}


export default CreateMedias;
