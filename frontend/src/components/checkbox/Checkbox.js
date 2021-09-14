import "./Checkbox.css";


const	Checkbox = ({ ...data }) => {
	if (!data) return ;
	let	checked = data.selected.some((tmp) => tmp?.id === data.row?.id);

	if (data.checked) checked = data.checked;

	return (
		<div className="checkbox">
			<div className="border" onClick={data.onClick}>
				<div className={`indicator ${checked ? "checked" : ""}`}></div>
			</div>
		</div>
	);
};


export default Checkbox;
