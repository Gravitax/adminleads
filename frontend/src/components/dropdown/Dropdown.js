import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./Dropdown.css";


const	Dropdown = ({ options, prompt, label, value, onChange }) => {
	const	[open, setOpen]		= useState(false);
	const	[query, setQuery]	= useState();
	
	const	ref = useRef(null);

	useEffect(() => {
		["click", "touchend"].forEach((e) => {
			document.addEventListener(e, toggle);
		});
		return (() => ["click", "touchend"].forEach((e) => {
			document.removeEventListener(e, toggle);
		}));
	}, []);

	function	toggle(e) {
		setOpen(e && e.target === ref.current);
	}

	function	selectOption(option) {
		setQuery("");
		onChange(option);
		setOpen(false);
	}

	function	search(options) {
		return (options.filter((option) => {
			if (!query)
				return (1);
			return (option[label] && option[label].toLowerCase().indexOf(query.toLowerCase()) > -1);
		}));
	}

	function	displayValue() {
		if (query?.length > 0)
			return (query);
		if (value)
			return (value[label]);
		return ("");
	}

	return (
		<div className="dropdown">
			<div className="control">
				<div className="selected_value">
					<input type="text" ref={ref}
						placeholder={value ? value[label] : prompt} value={displayValue()}
						onChange={(e) => {
							setQuery(e.target.value);
							onChange(null);
						}}
						onClick={() => toggle} onTouchEnd={() => toggle}
					/>

				</div>
				<div className={`arrow ${open ? "open" : ""}`}></div>
			</div>
			<div className={`options ${open ? "open" : ""}`}>
				{
					search(options).map((option) => {
						return (
							<div key={uuidv4()} className={`option ${value === option ? "selected" : ""}`}
								onClick={() => selectOption(option)} onTouchEnd={() => selectOption(option)}
							>
								{option[label]}
							</div>
						);
					})
				}
			</div>
		</div>
	);
};


export default Dropdown;