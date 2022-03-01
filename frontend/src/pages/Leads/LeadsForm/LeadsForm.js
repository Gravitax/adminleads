import React, { useState } from "react";
import DatePicker from "react-datepicker";

import Dropdown from "../Dropdown/Dropdown";

import "react-datepicker/dist/react-datepicker.css";

import "./LeadsForm.css";


const	LeadsForm = ({ ...data }) => {
	const	[dateStart, setDateStart]	= useState(null);
	const	[dateEnd, setDateEnd]		= useState(null);
	const	[dispositif, setDispositif]	= useState(null);
	const	[flux, setFlux]				= useState(null);
	const	[status, setStatus]			= useState(null);

	const	handleSubmit = (e) => {
		e.preventDefault();
		data?.onClick({
			dateStart		: dateStart,
			dateEnd			: dateEnd,
			dispositif		: dispositif?.id,
			flux			: flux?.id,
			status			: status?.status,
		});
	};

	return (
		<form id="leadsForm">

			<div className="flex_container">

				<DatePicker
					selected={dateStart} onChange={date => setDateStart(date)}
					dateFormat="dd/MM/yyyy" maxDate={new Date()}
					// showYearDropdown scrollableMonthYearDropdown
					isClearable placeholderText="date start"
				/>
				<DatePicker
					selected={dateEnd} onChange={date => setDateEnd(date)}
					dateFormat="dd/MM/yyyy" minDate={dateStart} maxDate={new Date()}
					// showYearDropdown scrollableMonthYearDropdown
					isClearable placeholderText="date end"
				/>

				<Dropdown prompt="flux" label="nom" value={flux}
					options={data?.flux}
					onChange={(value) => { setFlux(value) }}
				/>
				<Dropdown prompt="dispositifs" label="nom" value={dispositif}
					options={data?.dispositifs}
					onChange={(value) => { setDispositif(value); }}
				/>
				<Dropdown prompt="status" label="status" value={status}
					options={[{ status: "All" }, { status: "Valid" }, { status: "Invalid" }]}
					onChange={(value) => { setStatus(value) }}
				/>
				
			</div>

			<button onClick={handleSubmit}>SUBMIT</button>

		</form>
	);
};


export default LeadsForm;
