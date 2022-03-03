import React, { useState } from "react";
import Axios from "axios";

import { regex_username } from "../../../../modules/functions";

import "./CreateMedias.css";


function	CreateMedias() {
	const	[name, setName]						= useState("");
	const	[creationStatus, setCreationStatus]	= useState("");
	
	const	mediaCreation = (e) => {
		e.preventDefault();
		if (!regex_username(name)) {
			setCreationStatus("name is invalid");
			return ;
		}
		Axios.post("/medias/create", { name })
			.then((response) => {
				setCreationStatus(response.data.message);
			});
	};

	return (
		<div id="create_medias">
			<h1>Create Medias</h1>
			<form>

				<input type="text" name="name" placeholder="nom" autoComplete="off"
					onChange={(e) => setName(e.target.value)}
				/>
				<button onClick={mediaCreation}>CREATE</button>
				
				<p> {creationStatus} </p>

			</form>
		</div>
	);
}


export default CreateMedias;
