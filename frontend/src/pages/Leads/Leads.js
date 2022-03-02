import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import Axios from "axios";

import DataTableSearch from "./DataTableSearch/DataTableSearch";
import LeadsForm from "./LeadsForm/LeadsForm";

import "./Leads.css";


function	Leads() {
	const	[leadsList, setLeadsList]	= useState([]);	
	const	[medias, setMedias]			= useState([]);
	const	[clients, setClients]		= useState([]);

	const	[submit, setSubmit]		= useState(false);
	const	[subData, setSubData]	= useState([]);

	const	[loading, setLoading]	= useState(false);
	const	override				= `display: flex; justify-content: center; align-items: center;`;

	useEffect(() => {
		Axios.get("/medias/findAll")
			.then((response) => {
				setMedias(response.data);
			});
		Axios.get("/clients/findAll")
			.then((response) => {
				setClients(response.data);
			});
		if (submit) {
			setLeadsList([]);
			Axios.get("/leads/findQuery", { params : { subData } })
				.then((response) => {
					setSubmit(false);
					setLoading(false);
					setLeadsList(response.data);
				});
		}
	}, [submit, subData]);

	return (
		<div id="leads">
			<h1> LEADS LIST </h1>

			<LeadsForm
				onClick={({ ...data }) => {
					setSubData(data);
					setSubmit(true);
					setLoading(true);
				}}
				medias={medias} clients={clients}
			/>

			<br />
			{	loading &&
				<ScaleLoader
					css={override} size={150} color={"red"} loading={loading}
				/>
			}
			{ leadsList.length > 0 &&
				<DataTableSearch
					data={leadsList}
					medias={medias} clients={clients}
					onClick={() => {
						setSubmit(true);
						setLoading(true);
					}}
				/>
			}
			<span id="scroll_top" onClick={() => window.scrollTo(0, 0)}>scroll top</span>
		</div>
	);
}

export default Leads;
