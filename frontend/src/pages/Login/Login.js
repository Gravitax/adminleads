import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AuthContext from "../../contexts/AuthContext";
import * as Auth from "../../modules/auth";

import "./Login.css";


function	Login() {
	const	navigate = useNavigate();

	if (Auth.get())
		navigate("/private/home");


	const	[username, setUsername]			= useState("");
	const	[password, setPassword]			= useState("");
	const	[loginStatus, setLoginStatus]	= useState("");

	const	{ setUser } = useContext(AuthContext);

	const	userLogin = (e) => {
		e.preventDefault();
		Axios.post("/auth/login", { username, password })
			.then((response) => {
				if (response.data.token) {
					Auth.set(response.data.token);
					setUser(Auth.get());
					navigate("/private/home");
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
				<input type="text" name="username" placeholder="Username" autoComplete="off"
					onChange={(e) => setUsername(e.target.value)}
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
