import React, { useState } from "react";
import Axios from "axios";

import Dropdown from "../../dropdown/Dropdown";

import "./Selected.css";


const	Selected = ({ ...data }) => {
	const	[status, setStatus] = useState(null);

	function	handleAction() {
		Axios.post("/api/leads/update", { data, status })
			.then((response) => {
				console.log(response);
			});
	}

	return (
		<div id="selected">
			<Dropdown prompt="action" label="action" value={status}
				options={[
					{ action: "Anonymiser" },
					{ action: "Accepter" },
					{ action: "Rejeter" },
					{ action: "Exporter" },
					{ action: "Supprimer" },
				]}
				onChange={(value) => { setStatus(value) }}
			/>
			<span onClick={handleAction}> APPLY </span>
		</div>
	);
};

export default Selected;
