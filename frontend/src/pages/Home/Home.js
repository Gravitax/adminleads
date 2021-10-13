import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import { check_page_access, get_date } from "../../modules/functions";

import DataTableSearch from "../Leads/dataTableSearch/DataTableSearch";
import LeadsAlert from "./LeadsAlert";

import "./Home.css";


function	Home() {
	const	history	= useHistory();

	if (check_page_access(true) === false)
		history.push("/login");


	const	[module, setModule]	= useState("");
	const	[submit, setSubmit]	= useState(true);

	const	[leadsAccept, setLeadsAccept]		= useState([]);
	const	[leadsReject, setLeadsReject]		= useState([]);
	const	[destinataires, setDestinataires]	= useState([]);
	const	[provenances, setProvenances]		= useState([]);


	useEffect(() => {
		let		subData, date;

		date	= get_date({ day: -1, month: -1, year: 0 });

		if (submit) {
			subData	= { dateStart: date, status: "Valid", };
			Axios.get("/api/leads/readQuery", { params : { subData }, })
				.then((response) => { setLeadsAccept(response.data); });
			subData	= { dateStart: date, status: "Invalid", };
			Axios.get("/api/leads/readQuery", { params : { subData }, })
				.then((response) => { setLeadsReject(response.data); });
			setSubmit(false);
		}

		Axios.get("/api/leads/readDestinataires")
			.then((response) => { setDestinataires(response.data); });
		Axios.get("/api/leads/readProvenances")
			.then((response) => { setProvenances(response.data); });
	}, [submit]);

	function	toggleModule(moduleName) {
		if (module === moduleName)
			setModule("");
		else
			setModule(moduleName);
	}

	return (
		<div>
			<p>
				Leads data from {get_date({ day: 0, month: -1, year: 0 })}
			</p>
			<div id="head">
				<span onClick={() => { toggleModule("accept"); }}>A: {leadsAccept?.length}</span>
				<span onClick={() => { toggleModule("reject"); }}>R: {leadsReject?.length}</span>
				<span onClick={() => { toggleModule("alert"); }}>Alert(s)</span>
			</div>

			<br /><br />

			<div id="body">
				{ module === "accept" &&
					<DataTableSearch
						data={leadsAccept}
						destinataires={destinataires} provenances={provenances}
						onClick={() => { setSubmit(true); }}
					/>
				}
				{ module === "reject" &&
					<DataTableSearch
						data={leadsReject}
						destinataires={destinataires} provenances={provenances}
						onClick={() => { setSubmit(true); }}
					/>
				}
				{ module === "alert" && <LeadsAlert /> }
			</div>
		</div>
	);
}

export default Home;
