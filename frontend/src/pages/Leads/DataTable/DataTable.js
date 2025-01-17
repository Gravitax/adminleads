import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import Checkbox from "./Checkbox/Checkbox";
import Selected from "./Selected/Selected";
import Th from "./Th/Th";
import { getRowType, refaktorLabel, selectedColumn } from "./tools.js";

import { export_csv } from "../../../modules/export_csv";
import * as gd from "../../../modules/global_data";

import "./DataTable.css";


const	pageData = (data, page = 1, per = 50) => {
	if (page < 1)	page = 1;
	if (per < 1)	per = 1;
	return (data?.slice(per * (page - 1), per * page));
};

const	DataTable = ({ data, clients, medias, onClick }) => {
	const	[sortColumn, setSortColumn]	= useState("");
	const	[sortDir, setSortDir]		= useState("");
	const	[selected, setSelected]		= useState([]);
	const	[checked, setChecked]		= useState(false);
	const	[show, setShow] 			= useState(50);
	const	[state, setState]			= useState({
		data	: pageData(data),
		page	: 1,
	});

	const	ref = useRef(null);

	useEffect(() => {

		if (sortDir && sortColumn) {
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
			if (ref?.current) {
				const	cY		= window.scrollY;
				const	tbh		= ref.current.offsetHeight;
				const	tresh	= 2000;

				if (tbh - cY - tresh < 0)
					loadMore();
			}
		};

		document.addEventListener("scroll", handleScroll);
		return (() => document.removeEventListener("scroll", handleScroll));
	}, [data, sortColumn, sortDir]);

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
		<div id="dataTable_container">

			{ selected.length > 0 &&
				<Selected selected={selected} onClick={onClick} />
			}

			<h3>total query: {data.length}</h3>
			<h3>total selected: {selected.length}</h3>
			<h3>total page: {state.data.length}</h3>
			<div id="show_all">
				<input type="number" value={show} onChange={(e) => { setShow(e.target.value); }} />
				<span onClick={() => {
					if (show > data.length) setShow(data.length);
					setState({
						data	: pageData(data, 1, show),
						page	: 1,
					});
				}}>SHOW</span>
				<span onClick={() => {
					setShow(data.length);
					setState({
						data	: pageData(data, 1, data.length),
						page	: 1,
					});
				}}>SHOW ALL</span>
				<span onClick={() => export_csv(data, "leads_list")}>EXPORT ALL</span>
			</div>

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
											onClickColumn={() => { setSortColumn(heading); }}
										/>
									);
								}
								return (null);
							})
						}
						<Th key={uuidv4()} label={"Type"} className="type" />
						{ gd.auth.isAllowed([0, 1]) &&
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
						}
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
											let	label = refaktorLabel(column, row[column], clients, medias);

											return (<td key={uuidv4()}>{label}</td>);
										}
										return (null);
									})
								}
									<td key={uuidv4()}>{getRowType(row["webtag"], accept)}</td>
									{ gd.auth.isAllowed([0, 1]) &&
										<td>
											<Checkbox row={row} selected={selected}
												onClick={() => handleCheckboxChange(row)}
											/>
										</td>
									}
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
