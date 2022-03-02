export function		selectedColumn(column) {
	return (column === "timestamp" || column === "clients" || column === "media"
		|| column === "programme" || column === "projet"
		|| column === "email" || column === "webtag" || column === "commentaire");
}

export function		refaktorLabel(column, label, clients, medias) {
	if (!label || !clients || !medias) return ;
	if (column === "timestamp")
		return (label.split('T')[0]);
	if (column === "clients")	label = `${clients[label - 1]?.name} (${label})`;
	if (column === "media")		label = `${medias[label - 1]?.name} (${label})`;
	return (label);
}

export function		getRowType(webtag, accept) {
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
