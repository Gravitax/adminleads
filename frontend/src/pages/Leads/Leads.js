import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import Axios from "axios";

import DataTableSearch from "./DataTableSearch/DataTableSearch";
import LeadsForm from "./LeadsForm/LeadsForm";

import "./Leads.css";


function	Leads() {
	const	[leadsList, setLeadsList]		= useState([]);	
	const	[dispositifs, setDispositifs]	= useState([]);
	const	[flux, setFlux]					= useState([]);

	const	[submit, setSubmit]		= useState(false);
	const	[subData, setSubData]	= useState([]);

	const	[loading, setLoading]	= useState(false);
	const	override				= `display: flex; justify-content: center; align-items: center;`;

	useEffect(() => {
		Axios.get("/leads/readDispositifs")
			.then((response) => { setDispositifs(response.data); });
		Axios.get("/leads/readFlux")
			.then((response) => { setFlux(response.data); });
		if (submit) {
			setLeadsList([]);
			Axios.get("/leads/readQuery", { params : { subData } })
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
				dispositifs={dispositifs} flux={flux}
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
					dispositifs={dispositifs} flux={flux}
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
