import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import "./DataTable.css";


const	Icon = ({ children, onClick, active = false, size = 20, }) => {
	return (
		<svg style={ { height: size, width: size } } fill="none" stroke={ active ? "white" : "grey" }
			viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
		>
			{children}
		</svg>
	);
};

const	IconAsc = ({ onClick, active }) => {
	return (
		<Icon onClick={onClick} active={active}>
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
		</Icon>
	);
};

const	IconDsc = ({ onClick, active }) => {
	return (
		<Icon onClick={onClick} active={active}>
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
		</Icon>
	);
};

const	pageData = (data, page = 1, per = 50) => {
	return (data.slice(per * (page - 1), per * page));
};

const	DataTable = ({ data, provenances, destinataires }) => {

	const	[sortColumn, setSortColumn]	= useState("");
	const	[sortDir, setSortDir]		= useState("");
	const	[sort, setSort]				= useState(false);

	const	[state, setState]			= useState({
		data	: pageData(data),
		page	: 1,
	});

	const	ref = useRef(null);

	useEffect(() => {

		if (sort) {
			data.sort((a, b) => {
				a = a[sortColumn]?.toString();
				b = b[sortColumn]?.toString();
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

	function	renameColumn(column) {
		if (column === "timestamp")		return ("Date");
		if (column === "flux")			return ("Destinataires");
		if (column === "dispositif")	return ("Provenances");
		return (column.charAt(0).toUpperCase() + column.slice(1));
	}
	
	const	Th = ({ ...data }) => {
		let	active = data.label === data.target;

		return (
			<th key={data.key} onClick={data.onClickColumn} className={data.className}>
				<div>
					{renameColumn(data.label)}
					{ data.sort !== undefined &&
						<span>
							<IconAsc onClick={data.onClickDirAsc} active={active && data.sort === "asc"}/>
							<IconDsc onClick={data.onClickDirDsc} active={active && data.sort === "dsc"}/>
						</span>
					}
				</div>
			</th>
		);
	};

	function	selectedColumn(column) {
		if (column === "timestamp" || column === "flux" || column === "dispositif"
			|| column === "programme" || column === "projet"
			|| column === "email" || column === "webtag")
			return (true);
		return (false);
	}

	function	refaktorLabel(column, label, provenances, destinataires) {
		if (column === "timestamp")		return (label.split('T')[0]);
		if (column === "flux")			label = destinataires[label - 1]?.nom;
		if (column === "dispositif")	label = provenances[label - 1]?.nom;
		return (label);
	}

	function	getRowType(webtag, accept) {
		let	label = "Lead Prog.";

		if (!webtag)
			return (<span className={`lead ${accept}`}>{label}</span>);
		if (webtag.indexOf("SIM DUFL") > -1 || webtag.indexOf("SIMDUFLOT") > -1)	label = "Sim. Duflot";
		if (webtag.indexOf("SIM CENSI") > -1 || webtag.indexOf("SIMCENSI") > -1)	label = "Sim. Censi";
		if (webtag.indexOf("SIM LMNP") > -1 || webtag.indexOf("SIMLMNP") > -1)		label = "Sim. Lmnp";
		if (webtag.indexOf("DOC DUFLOT") > -1 || webtag.indexOf("GUIDUFLOT") > -1)	label = "Sim. Duflot";
		if (webtag.indexOf("GUIDE PINEL") > -1 || webtag.indexOf("GUIDPINEL") > -1)	label = "Guide Pinel";
		if (webtag.indexOf("SIM PINEL") > -1 || webtag.indexOf("SIMPINEL") > -1
			|| webtag.indexOf("DIS PINEL") > -1)									label = "Sim. pinel";
		return (<span className={`${label === "Lead Prog." ? "lead" : "sim"} ${accept}`}>{label}</span>);
	}
	
	const	columns	= state.data[0] && Object.keys(state.data[0]);

	return (
		<div>

			<h3>total: {data.length}</h3>

			<table cellSpacing={0} cellPadding={0} className="dataTable">

				<thead>
					<tr key={uuidv4()}>
						{
							state.data[0] && columns.map((heading) => {
								if (selectedColumn(heading)) {
									return (
										<Th key={uuidv4()} label={heading} target={sortColumn} sort={sortDir}
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
