import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { get_role } from "../../../modules/functions";
import * as gd from "../../../modules/global_data";

import "./Users.css";


function	Users() {
	const	[usersList, setUsersList] = useState([]);
	const	navigate = useNavigate();

	useEffect(() => {
		Axios.get("/users/findAll")
			.then((response) => {
				setUsersList(response.data);
			});
	}, []);

	const	userDelete = (email) => {
		// faire une demande de confirmation
		Axios.delete(`/users/delete/${email}`);

		// on actualise userList en supprimant l'email supprimé en database
		let	tmp = [];

		for (const [_, v] of Object.entries(usersList)) {
			if (v.email === email)
				continue ;
			tmp.push(v);
		}
		setUsersList(tmp);
	};

	const	userUpdate = (email) => {
		navigate(`${gd.path_routes.account}?email=${email}`);
	};

	return (
		
		<div id="users">
			{
				gd.auth.isAllowed([0, 1]) &&
				<>
					<b className="create" onClick={() => navigate(gd.path_routes.register)}> Create User </b>
					<br /><br />
				</>
			}
			<b> Users list: </b>
			<br /><br />
			{
				usersList.map((value) => {
					return (
						<div className="userCard" key={value.email}>
							<span className="userEmail"> [ {get_role(value.role)} ] - {value.email} </span>
							<span className="userControls">
								<span onClick={() => userUpdate(value.email)}>update</span>
								<span onClick={() => userDelete(value.email)}>delete</span>
							</span>
						</div>
					);
				})
			}
		</div>
	);
}


export default Users;
