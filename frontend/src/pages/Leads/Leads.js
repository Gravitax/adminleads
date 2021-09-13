import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import { check_page_access } from "../../modules/functions";

import DataTableSearch from "../../components/dataTableSearch/DataTableSearch";
import LeadsForm from "../../components/leadsForm/LeadsForm";

import "./Leads.css";


function	Leads() {
	const	history	= useHistory();

	if (check_page_access(true) === false)
		history.push("/");


	const	[leadsList, setLeadsList]			= useState([]);	
	const	[destinataires, setDestinataires]	= useState([]);
	const	[provenances, setProvenances]		= useState([]);

	const	[submit, setSubmit]		= useState(false);
	const	[subData, setSubData]	= useState([]);

	useEffect(() => {
		Axios.get("/api/leads/readDestinataires")
			.then((response) => {
				setDestinataires(response.data);
			});
		Axios.get("/api/leads/readProvenances")
			.then((response) => {
				setProvenances(response.data);
			});
		if (submit) {
			Axios.get("/api/leads/readQuery", { params : { subData }, })
				.then((response) => {
					setLeadsList(response.data);
				});
		}
	}, [submit, subData]);

	return (
		<div>
			<h1> LEADS LIST </h1>

			<LeadsForm
				onClick={({ ...data }) => {
					setSubmit(data?.submit);
					setSubData(data);
				}}
				destinataires={destinataires}
				provenances={provenances}
			/>

			<br />

			{ submit &&
				<DataTableSearch
					data={leadsList}
					destinataires={destinataires}
					provenances={provenances}
				/>
			}
		</div>
	);
}

export default Leads;