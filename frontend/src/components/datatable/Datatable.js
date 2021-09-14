import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import Checkbox from "../checkbox/Checkbox";
import Th from "./Th";
import { getRowType, refaktorLabel, selectedColumn } from "./tools.js";

import "./DataTable.css";


const	pageData = (data, page = 1, per = 50) => {
	return (data.slice(per * (page - 1), per * page));
};

const	DataTable = ({ data, provenances, destinataires }) => {

	const	[sortColumn, setSortColumn]	= useState("");
	const	[sortDir, setSortDir]		= useState("");
	const	[sort, setSort]				= useState(false);

	const	[selected, setSelected]		= useState([]);
	const	[checked, setChecked]		= useState(false);

	const	[state, setState]			= useState({
		data	: pageData(data),
		page	: 1,
	});

	const	ref = useRef(null);

	useEffect(() => {

		if (sort) {
			data.sort((a, b) => {
				a = a[sortColumn]?.toString().toLowerCase();
				b = b[sortColumn]?.toString().toLowerCase();
				if (!a && !b)
					return (0);
				if (sortDir === "asc" ? a < b : a > b)
					return (1);
				return (-1);
			});
		}

		setState({
			data	: pageData(data),
			page	: 1,
		});

		const	loadMore = () => {
			setState((prev) => ({
				data	: [
					...prev.data,
					...pageData(data, prev.page + 1),
				],
				page	: prev.page + 1,
			}));
		};
	
		const	handleScroll = () => {
			const	cY		= window.scrollY;
			const	tbh		= ref.current.offsetHeight;
			const	tresh	= 2000;
	
			if (tbh - cY - tresh < 0)
				loadMore();
		};

		document.addEventListener("scroll", handleScroll);
		return (() => document.removeEventListener("scroll", handleScroll));
	}, [data, sortColumn, sortDir, sort]);

	function	handleCheckboxChange(row) {
		setSelected((prev) => {
			// si row.id est deja dans prev alors on le supprime
			if (prev.some((tmp) => tmp.id === row.id))
				prev = prev.filter((tmp) => tmp.id !== row.id);
			else // sinon on l'append
				prev = [...prev, row];
			return (prev);
		});
	}
	
	const	columns	= state.data[0] && Object.keys(state.data[0]);

	return (
		<div>

			<h3>total query: {data.length}</h3>
			<h3>total page: {state.data.length}</h3>

			<table cellSpacing={0} cellPadding={0} className="dataTable">

				<thead>
					<tr key={uuidv4()}>
						{
							state.data[0] && columns.map((heading) => {
								if (selectedColumn(heading)) {
									return (
										<Th key={uuidv4()} label={heading} target={sortColumn}
											sort={sortDir} className={heading}
											onClickDirAsc={() => { setSortDir("asc"); }}
											onClickDirDsc={() => { setSortDir("dsc"); }}
											onClickColumn={() => { setSortColumn(heading); setSort(true); }}
										/>
									);
								}
								return (null);
							})
						}
						<Th key={uuidv4()} label={"Type"} className="type" />
						<th key={uuidv4()} className="select">
							<Checkbox selected={selected} checked={checked}
								onClick={() => {
									setChecked(!checked);
									// comme le toggle a un temps de retard on check !checked pour verifier si il est bien coché
									// si il est coché on coche toutes les lignes actuellement load
									if (!checked)
										return (state.data.map((row) => setSelected((prev) => [...prev, row])));
									// sinon on décoche toutes les lignes
									setSelected([]);
								}}
							/>
						</th>
					</tr>
				</thead>

				<tbody ref={ref}>
					{
						state.data.map((row) => {
							let	accept = row["accepte"] ? "accept" : "deny";

							return (
								<tr key={uuidv4()} className={accept}>
								{
									columns.map((column) => {
										if (selectedColumn(column)) {
											let	label = refaktorLabel(column, row[column], provenances, destinataires);

											return (<td key={uuidv4()}>{label}</td>);
										}
										return (null);
									})
								}
									<td key={uuidv4()}>{getRowType(row["webtag"], accept)}</td>
									<td>
										<Checkbox row={row} selected={selected}
											onClick={() => handleCheckboxChange(row)}
										/>
									</td>
								</tr>
							);
						})
					}
				</tbody>

			</table>
		</div>
	);
};


export default DataTable;
