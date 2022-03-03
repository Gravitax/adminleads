import React, { useState } from "react";
import Axios from "axios";

import { roles } from "../../../../modules/global_data";
import { regex_username, regex_password } from "../../../../modules/functions";

import "./CreateUsers.css";


function	CreateUsers() {
	const	[email, setEmail]					= useState("");
	const	[password, setPassword]				= useState("");
	const	[role, setRole]						= useState("");
	const	[creationStatus, setCreationStatus]	= useState("");

	const	userCreation = (e) => {
		e.preventDefault();
		if (!regex_username(email) || !regex_password(password)) {
			setCreationStatus("email or password not valid");
			return ;
		}
		Axios.post("/auth/register", { email, password, role })
			.then((response) => {
				setCreationStatus(response.data.message);
			});
	};

	return (
		<div id="create_users">
			<h1>Create Users</h1>
			<form>
				<input type="text" name="email" placeholder="Email" autoComplete="off"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input type="password" name="password" placeholder="Password" autoComplete="off"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<select onChange={(e) => setRole(e.target.value)}>
					<option value="0"> Role </option>
					{
						Object.entries(roles).map(([key, value]) => {
							return (
								<option value={value}> {key} </option>
							);
						})
					}
				</select>
				<button onClick={userCreation}>CREATE</button>
				<div>
					{creationStatus}
				</div>
			</form>
		</div>
	);
}


export default CreateUsers;
