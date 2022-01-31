import React, { useState, useEffect } from "react";
import Axios from "axios";

import { get_date } from "../../modules/functions";

import DataTableSearch from "../Leads/DataTableSearch/DataTableSearch";
import LeadsAlert from "./LeadsAlert";

import "./Home.css";


function	Home() {
	const	[module, setModule]	= useState("");
	const	[submit, setSubmit]	= useState(true);

	const	[leadsAccept, setLeadsAccept]		= useState([]);
	const	[leadsReject, setLeadsReject]		= useState([]);
	const	[destinataires, setDestinataires]	= useState([]);
	const	[provenances, setProvenances]		= useState([]);

	useEffect(() => {
		let		subData, date;

		if (submit) {
			date	= get_date({ day: -1, month: -1, year: 0 });
			subData	= { dateStart: date, status: "Valid", };
			Axios.get("/leads/readQuery", { params : { subData }, })
				.then((response) => { setLeadsAccept(response.data); });
			subData	= { dateStart: date, status: "Invalid", };
			Axios.get("/leads/readQuery", { params : { subData }, })
				.then((response) => { setLeadsReject(response.data); });
			setSubmit(false);
		}

		Axios.get("/leads/readDestinataires")
			.then((response) => { setDestinataires(response.data); });
		Axios.get("/leads/readProvenances")
			.then((response) => { setProvenances(response.data); });
	}, [submit]);

	function	toggleModule(moduleName) {
		if (module === moduleName)
			setModule("");
		else
			setModule(moduleName);
	}

	return (
		<div id="home">
			<p>
				Leads data from {get_date({ day: 0, month: 0, year: 0 })}
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
