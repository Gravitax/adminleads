import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./Navbar.css";


function	Navbar(props) {
	const	[classActive, setClassActive]	= useState(0);

	const	history		= useHistory();
	const	disconnect	= () => {
		localStorage.removeItem("auth_token");
		history.push("/");
	};

	const	token	= localStorage.getItem("auth_token");
	const	dToken	= token && jwt_decode(token);

	return (
		<div className="navbar">
			<NavLink exact to="/" activeClassName="active">
				Home
			</NavLink>
			{
				token ?
					<>
						<NavLink exact to="/leads" activeClassName="active">
							Leads
						</NavLink>
						{ dToken.role === 1 &&
							<NavLink exact to="/profil" activeClassName="active">
								Profil
							</NavLink>
						}
						<div className={"navbar_picto" + (classActive ? " active" : "")}
							onClick={() => { setClassActive(classActive ? 0 : 1); }}>
							<div className="navbar_collapse">
								<NavLink exact to={"/account?username=" + dToken.username} activeClassName="active">
									Account
								</NavLink>
								<span onClick={disconnect}>Disconnect</span>
							</div>
						</div>
					</> :
					<>
						<NavLink exact to="/login" activeClassName="active">
							Login
						</NavLink>
						<NavLink exact to="/register" activeClassName="active">
							Register
						</NavLink>
					</>
			}

		</div>
	);
}


export default Navbar;
