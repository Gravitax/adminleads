import React, { useState } from "react";
import Axios from "axios";

import Dropdown from "../../Dropdown/Dropdown";
import { exportCSV } from "../../../../modules/exportCSV";

import "./Selected.css";


const	Selected = ({ ...data }) => {
	const	[status, setStatus]	= useState(null);

	function	handleAction() {
		if (status?.action === "Exporter") {
			exportCSV(data?.selected, "leads_list");
		}
		else {
			Axios.post("/api/leads/update", { data, status })
				.then(() => { data?.onClick(); });
		}
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
