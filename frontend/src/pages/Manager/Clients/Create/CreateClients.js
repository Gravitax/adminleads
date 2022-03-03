import React, { useState } from "react";
import Axios from "axios";

import { regex_username } from "../../../../modules/functions";

import "./CreateClients.css";


function	CreateClients() {
	const	[name, setName]						= useState("");
	const	[creationStatus, setCreationStatus]	= useState("");
	
	const	clientCreation = (e) => {
		e.preventDefault();
		if (!regex_username(name)) {
			setCreationStatus("name is invalid");
			return ;
		}
		Axios.post("/clients/create", { name })
			.then((response) => {
				setCreationStatus(response.data.message);
			});
	};

	return (
		<div id="create_clients">
			<h1>Create Clients</h1>
			<form>
				<input type="text" name="name" placeholder="nom" autoComplete="off"
					onChange={(e) => setName(e.target.value)}
				/>
				<button onClick={clientCreation}>CREATE</button>
				<div>
					{creationStatus}
				</div>
			</form>
		</div>
	);
}


export default CreateClients;
