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

const	DataTable = ({ data }) => {

	const	[sortColumn, setSortColumn]	= useState("");
	const	[sortDir, setSortDir]		= useState("");

	let		[state, setState] = useState({
		data	: pageData(data),
		loading	: false,
		page	: 1,
	});

	const	ref = useRef(null);

	useEffect(() => {
		if (sortColumn && sortDir) {
			data.sort((a, b) => {
				if (sortDir === "asc" ? a[sortColumn] < b[sortColumn] : a[sortColumn] > b[sortColumn])
					return (1);
				return (-1);
			});
		}

		setState({
			data	: pageData(data),
			loading	: false,
			page	: 1,
		})

		const	loadMore = () => {
			setState((prev) => ({
				data	: [
					...prev.data,
					...pageData(data, prev.page + 1),
				],
				loading	: false,
				page	: prev.page + 1,
			}));
		};
	
		const	handleScroll = () => {
			const	cY		= window.scrollY;
			const	tbh		= ref.current.offsetHeight;
			const	tresh	= 2000;
	
			if (tbh - cY - tresh < 0 && !state.loading)
				loadMore();
		};

		document.addEventListener("scroll", handleScroll);
		return (() => document.removeEventListener("scroll", handleScroll));
	}, [data, sortColumn, sortDir, state.loading]);
	
	const	columns	= state.data[0] && Object.keys(state.data[0]);
	
	const	Th = ({ ...data }) => {
		let	active = data.label === data.target;

		return (
			<th key={data.key} onClick={data.onClickColumn}>
				<div>
					{data.label}
					<span>
						<IconAsc onClick={data.onClickDirAsc} active={active && data.sort === "asc"}/>
						<IconDsc onClick={data.onClickDirDsc} active={active && data.sort === "dsc"}/>
					</span>
				</div>
			</th>
		);
	};

	function	selectedColumn(column) {
		if (column === "timestamp" || column === "flux" || column === "dispositif"
			|| column === "programme" || column === "projet"
			|| column === "email"
			|| column === "webtag")
			return (true);
		return (false);
	}

	function	renameColumn(column) {
		if (column === "timestamp")		return ("Date");
		if (column === "flux")			return ("Provenance");
		if (column === "dispositif")	return ("Dispositif");
		return (column.charAt(0).toUpperCase() + column.slice(1));
	}

	function	refaktorLabel(column, label) {
		if (column === "timestamp")	return (label.split('T')[0]);
		return (label ? label : "-");
	}

	return (
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
										onClickColumn={() => { setSortColumn(heading); }}
									/>
								);
							}
						})
					}
				</tr>
			</thead>

			<tbody ref={ref}>
				{
					state.data.map((row) => {
						return (
							<tr key={uuidv4()}>
							{
								columns.map((column) => {
									if (selectedColumn(column)) {
										let	label = refaktorLabel(column, row[column]);

										return (<td key={uuidv4()}>{label}</td>);
									}
								})
							}
							</tr>
						);
					})
				}
			</tbody>

		</table>
	);
};


export default DataTable;
