
const models = require('../models/index.js');
const sequelize = models.sequelize; // get reference to sequelize

/**
* Role Based Access Control
* @category  RBAC Helper
*/

let excludePages = ['account', 'components_data', 'upload']; //pages to exclude from access authorization check

class Rbac{
	AUTHORIZED = "authorized";
	FORBIDDEN = "forbidden";
	UNKNOWN_ROLE = "unknown_role";
	userPages = [];
	constructor(role){
		this.userRole = role;
	}

	async getUserPages(){
		if(this.userRole){
			let sqltext = `SELECT permission AS permission FROM permissions where role_id = :userrole`;
			let queryParams = {
				userrole: this.userRole
			}
			let records = await sequelize.query(sqltext, {replacements: queryParams, type: sequelize.QueryTypes.SELECT });
			this.userPages = records.map(e => e.permission);
		}
		return this.userPages;
	}

	async getRoleNames(){
		let roles = [];
		if(this.userRole){
			let sqltext = `SELECT role_name AS role FROM roles WHERE role_id = :userrole`;
			let queryParams = {
				userrole: this.userRole
			}
			let records = await sequelize.query(sqltext, {replacements: queryParams, type: sequelize.QueryTypes.SELECT });
			roles = records.map(e => e.role);
		}
		return roles;
	}
	
	getPageAccess (path){
		try{
			path = path.replace(/^\/|\/$/g, ''); //Replace all leading slash and trailing slash
			let arrPath = path.split("/");
			let page = arrPath[0];
			if (excludePages.includes(page)) {
				return this.AUTHORIZED;
			}
			let action = (arrPath[1] ? arrPath[1] : "list");
			if (action == "index") {
				action = "list";
			}
			let userRole = this.userRole;
			if(userRole){
				if(this.userPages.includes(`${page}/${action}`)){
					return this.AUTHORIZED;
				} else{
					return this.FORBIDDEN;
				}
			}
			else{
				return this.UNKNOWN_ROLE;
			}
		}
		catch(err){
			console.log(err);
		}
		return this.FORBIDDEN;
	}
}

module.exports = Rbac;
