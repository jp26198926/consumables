
const excel = require("exceljs");
const utils = require("../helpers/utils");
const ejs = require('ejs');
const pdf = require('html-pdf');
const config = require('../config.js');
module.exports =  {
	async export(records, req, res) {
		try{
			let format = req.query.export.toLowerCase();
			let columns =  [
				{header: "Date", key: "date"},
				{header: "Qty", key: "qty"},
				{header: "Remarks", key: "remarks"},
				{header: "Expiry", key: "expiry"},
				{header: "Created By", key: "created_by"},
				{header: "Updated By", key: "updated_by"},
				{header: "Department Id", key: "department_id"},
				{header: "UOM", key: "measurement_id"},
				{header: "Items Id", key: "items_id"},
				{header: "Items Barcode", key: "items_barcode"},
				{header: "Items Name", key: "items_name"},
				{header: "Items Type Id", key: "items_type_id"},
				{header: "Items Measurement Id", key: "items_measurement_id"},
				{header: "Items Date Created", key: "items_date_created"},
				{header: "Items Date Updated", key: "items_date_updated"},
				{header: "Action Types Id", key: "action_types_id"},
				{header: "Action Types Action Type", key: "action_types_action_type"},
				{header: "Action Types Date Created", key: "action_types_date_created"},
				{header: "Action Types Date Updated", key: "action_types_date_updated"},
				{header: "Departments Id", key: "departments_id"},
				{header: "Departments Department", key: "departments_department"},
				{header: "Users Id", key: "users_id"},
				{header: "Users Username", key: "users_username"},
				{header: "Users Email", key: "users_email"},
				{header: "Users Telelphone", key: "users_telelphone"},
				{header: "Users Photo", key: "users_photo"},
				{header: "Users Name", key: "users_name"},
				{header: "Users User Role Id", key: "users_user_role_id"},
				{header: "UOM", key: "measurements_name"}
			]
			let filename = "stockslist-report";
			if(format == "excel"){
				let workbook = new excel.Workbook();
				let worksheet = workbook.addWorksheet("");
				worksheet.columns = columns;
				worksheet.addRows(records);
				res.setHeader("Content-Disposition", `attachment; filename=${filename}.xlsx`);
				return workbook.xlsx.write(res).then(function () {
					res.status(200).end();
				})
			}
			else if(format == "csv"){
				let workbook = new excel.Workbook();
				let worksheet = workbook.addWorksheet("");
				worksheet.columns = columns;
				worksheet.addRows(records);
				res.setHeader("Content-Disposition", `attachment; filename=${filename}.csv`);
				return workbook.csv.write(res).then(function () {
					res.status(200).end();
				})
			}
			else if(format == "pdf"){
				let page = "stockslist.ejs";
				let html = await ejs.renderFile("views/layouts/report.ejs", {records, page, config});
				pdf.create(html).toStream((err, pdfStream) => {
					if(err){
						return res.serverError("Error creating pdf")
					}
					else{
						res.statusCode = 200
						pdfStream.on('end', () => {
							return res.end()
						})
						pdfStream.pipe(res);
					}
				});
			}
			else if(format == "print"){
				let page = "stockslist.ejs";
				let html = await ejs.renderFile("views/layouts/report.ejs", {records, page, config});
				return res.ok(html);
			}
		}
		catch(err){
			console.error(err)
			return res.serverError(err);
		}
	}
}
