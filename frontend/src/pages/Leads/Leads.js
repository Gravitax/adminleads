import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { check_page_access } from "../../modules/functions";

import Datatable from "../../components/datatable/Datatable";

import "./Leads.css";


function	Leads() {
	const	history	= useHistory();
	const	token	= localStorage.getItem("auth_token");

	if (check_page_access(true) === false)
		history.push("/");


	const	[leadsList, setLeadsList]			= useState([]);

	const	[q, setQ]							= useState("");
	const	[searchColumns, setSearchColumns]	= useState(["nom", "prenom", "email"]);

	useEffect(() => {
		Axios.get(`/api/leads/read`, { params : { token } })
			.then((response) => {
				setLeadsList(response.data);
			});
	}, [token]);

	function	search(rows) {
		return (rows.filter((row) => {
			return (
				searchColumns.some((column) => {
					return (row[column] && row[column].toString().toLowerCase().indexOf(q) > -1);
				})
			);
		}));
	}

	// let	columns = leadsList[0] && Object.keys(leadsList[0]);

	return (
		<div>
			<br /><br />
			<h1> LEADS LIST </h1>

			<b> New query: </b>
			<div>
				<input type="date" placeholder="DATE START" />
				<input type="date" placeholder="DATE END" />
				<input type="text" placeholder="FROM" />
				<input type="text" placeholder="TO" />
				<input type="text" placeholder="TYPE" />
				<button>SUBMIT</button>
			</div>
			<br /><br />

			<b> Search: </b>
			{
				<div>
					<div>
						<input type="text" value={q} onChange={(e) => { setQ(e.target.value) }} />
						{/* {
							columns && columns.map((column) => {
								return (
									<label key={uuidv4()}>
										<input type="checkbox" checked={searchColumns.includes(column)}
											onChange={() => {
												const	checked = searchColumns.includes(column);

												setSearchColumns((prev) => {
													return (checked ? prev.filter((sc) => { return (sc !== column); }) : [...prev, column]);
												});
											}}
										/>
										{column}
									</label>
								);
							})
						} */}
					</div>
					<br /><br />
					<div>
						<Datatable data={search(leadsList)}></Datatable>
					</div>
				</div>
			}
		</div>
	);
}

export default Leads;