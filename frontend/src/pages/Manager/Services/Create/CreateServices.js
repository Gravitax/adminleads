import React, { useState } from "react";
import Axios from "axios";

import { regex_username } from "../../../../modules/functions";

import "./CreateServices.css";


function	CreateServices() {
	const	[name, setName]						= useState("");
	const	[creationStatus, setCreationStatus]	= useState("");
	
	const	serviceCreation = (e) => {
		e.preventDefault();
		if (!regex_username(name)) {
			setCreationStatus("name is invalid");
			return ;
		}
		Axios.post("/services/create", { name })
			.then((response) => {
				setCreationStatus(response.data.message);
			});
	};

	return (
		<div id="create_services">
			<h1>Create Services</h1>
			<form>
				<input type="text" name="name" placeholder="nom" autoComplete="off"
					onChange={(e) => setName(e.target.value)}
				/>
				<button onClick={serviceCreation}>CREATE</button>
				<div>
					{creationStatus}
				</div>
			</form>
		</div>
	);
}


export default CreateServices;
