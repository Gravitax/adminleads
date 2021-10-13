export function		selectedColumn(column) {
	return (column === "timestamp" || column === "flux" || column === "dispositif"
		|| column === "programme" || column === "projet"
		|| column === "email" || column === "webtag" || column === "commentaire");
}

export function		refaktorLabel(column, label, provenances, destinataires) {
	if (!label || !provenances || !destinataires) return ;
	if (column === "timestamp")		return (label.split('T')[0]);
	if (column === "flux")			label = `${destinataires[label - 1]?.nom} (${label})`;
	if (column === "dispositif")	label = `${provenances[label - 1]?.nom} (${label})`;
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
