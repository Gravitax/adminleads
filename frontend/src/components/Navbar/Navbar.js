import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import * as Auth from "../../modules/auth"

import "./Navbar.css";


function	Navbar() {
	const	[classActive, setClassActive]	= useState(0);

	const	{ user, setUser } = useContext(AuthContext);

	const	navigate	= useNavigate();
	const	disconnect	= () => {
		Auth.remove();
		setUser({});
		navigate("/public/login");
	};

	return (
		<div className="navbar">
			<NavLink exact to="/private/home" activeClassName="active">
				Home
			</NavLink>
			<NavLink exact to="/private/leads" activeClassName="active">
				Leads
			</NavLink>
			{ Auth.isAllowed([0, 1]) &&
				<NavLink exact to="/private/users" activeClassName="active">
					Users
				</NavLink>
			}
			<div className={"navbar_picto" + (classActive ? " active" : "")}
				onClick={() => { setClassActive(classActive ? 0 : 1); }}>
				<div className="navbar_collapse">
					<NavLink exact to={"/private/account?username=" + user.username} activeClassName="active">
						Account
					</NavLink>
					<span onClick={disconnect}>Disconnect</span>
				</div>
			</div>
		</div>
	);
}


export default Navbar;
