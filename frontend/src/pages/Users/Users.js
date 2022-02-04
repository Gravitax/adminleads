import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { path_routes } from "../../modules/global_data";

import "./Users.css";


function	Users() {
	const	[usersList, setUsersList] = useState([]);
	const	navigate = useNavigate();

	useEffect(() => {
		Axios.get("/users/read")
			.then((response) => { setUsersList(response.data); });
	}, []);

	const	userDelete = (username) => {
		// faire une demande de confirmation
		Axios.delete(`/users/delete/${username}`)
			.then(() => { navigate(0); });
	};

	const	userUpdate = (username) => {
		navigate(`${path_routes.account}?username=${username}`);
	};

	return (
		
		<div id="users">
			<b id="create" onClick={() => navigate(path_routes.register)}> Create User </b>
			<br /><br />
			<b> Users list: </b>
			<br /><br />
			{
				usersList.map((value) => {
					return (
						<div className="userCard" key={value.username}>
							<span className="userName"> - {value.username } </span>
							<span className="userControls">
								<span onClick={() => userUpdate(value.username)}>update</span>
								<span onClick={() => userDelete(value.username)}>delete</span>
							</span>
						</div>
					);
				})
			}
		</div>
	);
}

export default Users;
