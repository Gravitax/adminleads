import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import { check_page_access } from "../../modules/functions";

import "./Login.css";


function	Login() {
	const	history = useHistory();

	if (check_page_access(false) === false)
		history.push("/");

	
	const	[username, setUsername]			= useState("");
	const	[password, setPassword]			= useState("");
	const	[loginStatus, setLoginStatus]	= useState("");

	const	userLogin = () => {
		Axios.post("/api/auth/login", {
			username	: username,
			password	: password,
		})
			.then((response) => {
				if (response.data.token) {
					localStorage.setItem("auth_token", response.data.token);
					history.push("/");
				}
				else {
					setLoginStatus(response.data.message);
				}
			});
	};

	return (
		<div className="login">
			<h1>Login</h1>
			<div className="login_form">
				<input type="text" name="username" placeholder="Username"
					onChange={(e) => { setUsername(e.target.value); }}
				/>
				<input type="password" name="password" placeholder="Password"
					onChange={(e) => { setPassword(e.target.value); }}
				/>
				<button onClick={userLogin}>LOGIN</button>
				<div>
					{loginStatus}
				</div>
			</div>
		</div>
	);
}


export default Login;
