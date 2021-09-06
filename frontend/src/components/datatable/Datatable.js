import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import "./Datatable.css";


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

const	Datatable = ({ data }) => {

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
				if (!a[sortColumn] || !b[sortColumn])
					return (0);
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
			const	tresh	= 1000;
	
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

	return (
		<table cellSpacing={0} cellPadding={0}>

			<thead>
				<tr id={sortDir} key={uuidv4()}>
					{
						state.data[0] && columns.map((heading) =>
						<Th key={uuidv4()} label={heading} target={sortColumn} sort={sortDir}
							onClickDirAsc={() => { setSortDir("asc"); }}
							onClickDirDsc={() => { setSortDir("dsc"); }}
							onClickColumn={() => { setSortColumn(heading); }}
						/>)
					}
				</tr>
			</thead>

			<tbody ref={ref}>
				{
					state.data.map((row) => {
						return (
							<tr key={uuidv4()}>{ columns.map((column) => { return (<td key={uuidv4()}>{row[column]}</td>); }) }</tr>
						);
					})
				}
			</tbody>

		</table>
	);
};


export default Datatable;
