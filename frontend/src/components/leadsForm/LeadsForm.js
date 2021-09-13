import React, { useState } from "react";
import DatePicker from "react-datepicker";

import Dropdown from "../dropdown/Dropdown";

import "react-datepicker/dist/react-datepicker.css";

import "./LeadsForm.css";


const	LeadsForm = ({ ...data }) => {
	const	[dateStart, setDateStart]			= useState(null);
	const	[dateEnd, setDateEnd]				= useState(null);
	const	[destinataires, setDestinataires]	= useState(null);
	const	[provenances, setProvenances]		= useState(null);

	const	handleSubmit = () => {
		data.onClick({
			dateStart		: dateStart,
			dateEnd			: dateEnd,
			destinataires	: destinataires,
			provenances		: provenances,
			submit			: true,
		});
	};

	return (
		<div className="leadsForm">

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

				<Dropdown options={data?.destinataires} prompt="destinataires" label="nom"
					value={destinataires} onChange={(value) => { setDestinataires(value); }}
				/>
				<Dropdown options={data?.provenances} prompt="provenances" label="nom"
					value={provenances} onChange={(value) => { setProvenances(value) }}
				/>
				
			</div>

			<button onClick={handleSubmit}>SUBMIT</button>

		</div>
	);
};


export default LeadsForm;
