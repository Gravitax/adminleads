import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";

import DataTable from "../dataTable/DataTable";


const	DataTableSearch = ({ data, provenances, destinataires, onClick }) => {
	const	[query, setQuery]					= useState("");
	const	[searchColumns, setSearchColumns]	= useState([
		"timestamp", "flux", "programme", "dispositif", "email", "webtag", "projet", "commentaire",
	]);

	let	columns = data[0] && Object.keys(data[0]);

	function	search(rows) {
		return (rows.filter((row) => {
			return (
				searchColumns.some((column) => {
					return (row[column] && row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1);
				})
			);
		}));
	}

	return (
		<div>
			<b> Search : </b>

			<br />

			<input type="text" value={query} onChange={(e) => { setQuery(e.target.value) }} />
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
			<DataTable
				data={search(data)}
				destinataires={destinataires}
				provenances={provenances}
				onClick={onClick}
			/>
		</div>
	);
}


export default DataTableSearch;
