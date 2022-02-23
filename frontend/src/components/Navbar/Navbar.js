import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import * as gd from "../../modules/global_data";

import "./Navbar.css";


function	Navbar() {
	const	[classActive, setClassActive]	= useState(0);

	const	{ user, setUser } = useContext(AuthContext);

	const	navigate	= useNavigate();
	const	disconnect	= () => {
		gd.auth.remove();
		setUser({});
		navigate(gd.path_routes.login);
	};

	return (
		<div className="navbar">
			<Link to={gd.path_routes.home}>
				Home
			</Link>
			<Link to={gd.path_routes.leads}>
				Leads
			</Link>
			{ gd.auth.isAllowed([0, 1]) &&
				<Link to={gd.path_routes.users}>
					Users
				</Link>
			}
			<div className={"navbar_picto" + (classActive ? " active" : "")}
				onClick={() => { setClassActive(classActive ? 0 : 1); }}>
				<div className="navbar_collapse">
					<Link to={`${gd.path_routes.account}?email=${user?.email}`}>
						Account
					</Link>
					<span onClick={disconnect}>Disconnect</span>
				</div>
			</div>
		</div>
	);
}


export default Navbar;
