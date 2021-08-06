import React from "react";
import { useHistory } from "react-router-dom";

import { check_page_access } from "../../modules/functions";

import "./Leads.css";


function	Leads() {
	const	history 	= useHistory();

	if (check_page_access(true) === false)
		history.push("/");

	return (
		<div>Leads</div>
	);
}

export default Leads;