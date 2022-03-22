import React, { useState, useEffect } from "react";
import Axios from "axios";

import { regex_username } from "../../../../modules/functions";

import "./CreateServices.css";


function	CreateServices() {
	const	[name, setName]						= useState("");
	const	[media, setMedia]					= useState("");
	const	[client, setClient]					= useState("");
	const	[creationStatus, setCreationStatus]	= useState("");

	const	[medias, setMedias]		= useState([]);
	const	[clients, setClients]	= useState([]);
	
	const	serviceCreation = (e) => {
		e.preventDefault();
		if (!regex_username(name)) {
			setCreationStatus("name is invalid");
			return ;
		}
		if (!media || !client) {
			setCreationStatus("please specify media and client");
			return ;
		}
		Axios.post("/services/create", { name, media, client })
			.then((response) => {
				setCreationStatus(response.data.message);
			});
	};

	useEffect(() => {
		Axios.get("/medias/findAll")
			.then((response) => {
				setMedias(response.data);
			});
		Axios.get("/clients/findAll")
			.then((response) => {
				setClients(response.data);
			});
	}, []);

	return (
		<div id="create_services">
			<h1>Create Services</h1>
			<form>

				<input type="text" name="name" placeholder="nom" autoComplete="off"
					onChange={(e) => setName(e.target.value)}
				/>
				<select onChange={(e) => setMedia(e.target.value)}>
					<option value=""> Media </option>
					{
						Object.entries(medias).map(([, value]) => {
							return (
								<option value={value.name}> {value.name} </option>
							);
						})
					}
				</select>
				<select onChange={(e) => setClient(e.target.value)}>
					<option value=""> Client </option>
					{
						Object.entries(clients).map(([, value]) => {
							return (
								<option value={value.name}> {value.name} </option>
							);
						})
					}
				</select>
				<button onClick={serviceCreation}>CREATE</button>

				<p> {creationStatus} </p>

			</form>
		</div>
	);
}


export default CreateServices;
