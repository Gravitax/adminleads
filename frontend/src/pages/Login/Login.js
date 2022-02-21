import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AuthContext from "../../contexts/AuthContext";
import * as gd from "../../modules/global_data";

import "./Login.css";


function	Login() {
	const	navigate = useNavigate();

	const	[email, setEmail]				= useState("");
	const	[password, setPassword]			= useState("");
	const	[loginStatus, setLoginStatus]	= useState("");

	const	{ setUser } = useContext(AuthContext);

	const	userLogin = (e) => {
		e.preventDefault();
		Axios.post("/auth/login", { email, password })
			.then((response) => {
				if (response.data.token) {
					gd.auth.set(response.data.token);
					setUser(gd.auth.get());
					navigate(gd.path_routes.home);
				}
				else {
					setLoginStatus(response.data.message);
				}
			});
	};

	return (
		<div id="login">
			<h1>Login</h1>
			<form>
				<input type="text" name="email" placeholder="Email" autoComplete="off"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input type="password" name="password" placeholder="Password" autoComplete="off"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={userLogin}>LOGIN</button>
				<div>
					{loginStatus}
				</div>
			</form>
		</div>
	);
}


export default Login;
