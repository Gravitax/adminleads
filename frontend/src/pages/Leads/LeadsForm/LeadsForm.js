import React, { useState } from "react";
import DatePicker from "react-datepicker";

import Dropdown from "../Dropdown/Dropdown";

import "react-datepicker/dist/react-datepicker.css";

import "./LeadsForm.css";


const	LeadsForm = ({ ...data }) => {
	const	[dateStart, setDateStart]			= useState(null);
	const	[dateEnd, setDateEnd]				= useState(null);
	const	[destinataires, setDestinataires]	= useState(null);
	const	[provenances, setProvenances]		= useState(null);
	const	[status, setStatus]					= useState(null);

	const	handleSubmit = () => {
		data?.onClick({
			dateStart		: dateStart,
			dateEnd			: dateEnd,
			destinataires	: destinataires,
			provenances		: provenances,
			status			: status,
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

				<Dropdown prompt="destinataires" label="nom" value={destinataires}
					options={data?.destinataires}
					onChange={(value) => { setDestinataires(value); }}
				/>
				<Dropdown prompt="provenances" label="nom" value={provenances}
					options={data?.provenances}
					onChange={(value) => { setProvenances(value) }}
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
