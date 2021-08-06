import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import { check_page_access } from "../../modules/functions";

import "./Profil.css";


function	Profil() {
	const	[status, setStatus]			= useState("");
	const	[usersList, setUsersList]	= useState([]);

	const	history = useHistory();
	const	token	= localStorage.getItem("auth_token");

	if (check_page_access(true, 1) === false)
		history.push("/");

	useEffect(() => {
		Axios.get("/api/users/read", { params : { token } })
			.then((response) => { setUsersList(response.data); });
	}, [token, usersList]);

	const	userDelete = (username) => {
		// faire une demande de confirmation
		Axios.delete(`/api/users/delete/${username}`, { params : { token } })
			.then(() => { setStatus(`user: " ${username} " deleted`); });
	};

	const	userUpdate = (username) => {
		history.push(`/account?username=${username}`);
	};

	return (
		<div className="profil_userList">
			<b> Users list: </b>
			<br /><br />
			{
				usersList.map((value) => {
					return (
						<div className="userCard" key={value.username}>
							<span className="userName"> - {value.username } </span>
							<span className="userControls">
								<span onClick={() => { userUpdate(value.username); }}>update</span>
								<span onClick={() => { userDelete(value.username); }}>delete</span>
							</span>
						</div>
					);
				})
			}
			<br /><br />
			<p>{status}</p>
		</div>
	);
}

export default Profil;
