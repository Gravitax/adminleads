import FileSaver from "file-saver";
import XLSX from "xlsx";


export const	export_csv = (csv_data, file_name) => {

	if (!csv_data || !file_name) return ;

	const	file_type		= "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";	
	const	file_extension	= ".xlsx";
	const	ws				= XLSX.utils.json_to_sheet(csv_data);
	const	wb				= { Sheets: { "data" : ws }, SheetNames: ["data"] };
	const	excel_buffer	= XLSX.write(wb, { bookType : "xlsx", type : "array" });
	const	data			= new Blob([excel_buffer], { type : file_type });

	FileSaver.saveAs(data, file_name + file_extension);
}
