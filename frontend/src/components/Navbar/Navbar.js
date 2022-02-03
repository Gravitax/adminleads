import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import * as config from "../../config";

import "./Navbar.css";


function	Navbar() {
	const	[classActive, setClassActive]	= useState(0);

	const	{ user, setUser } = useContext(AuthContext);

	const	navigate	= useNavigate();
	const	disconnect	= () => {
		config.Auth.remove();
		setUser({});
		navigate(config.path_routes.login);
	};

	return (
		<div className="navbar">
			<Link to={config.path_routes.home}>
				Home
			</Link>
			<Link to={config.path_routes.leads}>
				Leads
			</Link>
			{ config.Auth.isAllowed([0, 1]) &&
				<Link to={config.path_routes.users}>
					Users
				</Link>
			}
			<div className={"navbar_picto" + (classActive ? " active" : "")}
				onClick={() => { setClassActive(classActive ? 0 : 1); }}>
				<div className="navbar_collapse">
					<Link to={`${config.path_routes.account}?username=${user?.username}`}>
						Account
					</Link>
					<span onClick={disconnect}>Disconnect</span>
				</div>
			</div>
		</div>
	);
}


export default Navbar;
