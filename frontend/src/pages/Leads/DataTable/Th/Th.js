function	renameColumn(column) {
	if (column === "timestamp")		return ("Date");
	if (column === "flux")			return ("Destinataires");
	if (column === "dispositif")	return ("Provenances");
	return (column.charAt(0).toUpperCase() + column.slice(1));
}

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

export default Th;
