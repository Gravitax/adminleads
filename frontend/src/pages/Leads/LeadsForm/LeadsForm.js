import React, { useState } from "react";
import DatePicker from "react-datepicker";

import Dropdown from "../Dropdown/Dropdown";

import "react-datepicker/dist/react-datepicker.css";

import "./LeadsForm.css";


const	LeadsForm = ({ ...data }) => {
	const	[dateStart, setDateStart]	= useState(null);
	const	[dateEnd, setDateEnd]		= useState(null);
	const	[media, setMedia]			= useState(null);
	const	[client, setClient]			= useState(null);
	const	[status, setStatus]			= useState(null);

	const	handleSubmit = (e) => {
		e.preventDefault();
		data?.onClick({
			dateStart	: dateStart,
			dateEnd		: dateEnd,
			media		: media?.id,
			client		: client?.id,
			status		: status?.status,
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

				<Dropdown prompt="medias" label="name" value={media}
					options={data?.medias}
					onChange={(value) => { setMedia(value); }}
				/>
				<Dropdown prompt="clients" label="name" value={client}
					options={data?.clients}
					onChange={(value) => { setClient(value) }}
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
