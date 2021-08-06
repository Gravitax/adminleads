import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import { regex_username } from "../../modules/functions";
import { regex_password } from "../../modules/functions";
import { check_page_access } from "../../modules/functions";

import "./Register.css";


function	Register() {
	const	[username, setUsername]				= useState("");
	const	[password, setPassword]				= useState("");
	const	[registerStatus, setRegisterStatus]	= useState("");

	const	history = useHistory();

	if (check_page_access(false) === false)
		history.push("/");

	const	userRegister = () => {
		if (!regex_username(username) || !regex_password(password)) {
			setRegisterStatus("username not valid");
			return ;
		}
		Axios.post("/api/auth/register", {
			username	: username,
			password	: password,
		})
			.then((response) => {
				setRegisterStatus(response.data.message);
				if (response.data && response.data.exist !== true)
					history.push("/login");
			});
	};

	return (
		<div className="register">
			<h1>Register</h1>
			<div className="register_form">
				<input type="text" name="username" placeholder="Username"
					onChange={(e) => { setUsername(e.target.value); }}
				/>
				<input type="password" name="password" placeholder="Password"
					onChange={(e) => { setPassword(e.target.value); }}
				/>
				<button onClick={userRegister}>REGISTER</button>
				<div>
					{registerStatus}
				</div>
			</div>
		</div>
	);
}


export default Register;
