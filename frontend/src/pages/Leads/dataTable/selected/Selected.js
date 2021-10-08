import React, { useState } from "react";
import Axios from "axios";

import Dropdown from "../../dropdown/Dropdown";
import ExportCSV from "./ExportCSV";

import "./Selected.css";


const	Selected = ({ ...data }) => {
	const	[status, setStatus]			= useState(null);
	const	[dataExport, setDataExport]	= useState();

	function	handleAction() {
		if (status?.action === "Exporter") {
			setDataExport(data?.selected);
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

			{ dataExport?.length > 0 &&
				<ExportCSV csvData={dataExport} fileName={"leads_list"} />
			}
		</div>
	);
};

export default Selected;
