import FileSaver from "file-saver";
import XLSX from "xlsx";


export const	exportCSV = (csvData, fileName) => {

	if (!csvData || !fileName) return ;

	const	fileType		= "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";	
	const	fileExtension	= ".xlsx";
	const	ws				= XLSX.utils.json_to_sheet(csvData);
	const	wb				= { Sheets: { "data" : ws }, SheetNames: ["data"] };
	const	excelBuffer		= XLSX.write(wb, { bookType : "xlsx", type : "array" });
	const	data			= new Blob([excelBuffer], { type : fileType });

	FileSaver.saveAs(data, fileName + fileExtension);
}
