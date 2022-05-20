
const BaseModel = require("./basemodel");
class Audits extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				log_id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				action: {name: 'action', type:Sequelize.STRING},
				page: {name: 'page', type:Sequelize.STRING},
				record_id: {name: 'record_id', type:Sequelize.STRING},
				old_values: {name: 'old_values', type:Sequelize.STRING},
				new_values: {name: 'new_values', type:Sequelize.STRING},
				user_id: {name: 'user_id', type:Sequelize.STRING},
				user_ip: {name: 'user_ip', type:Sequelize.STRING},
				user_agent: {name: 'user_agent', type:Sequelize.STRING},
				request_url: {name: 'request_url', type:Sequelize.STRING},
				timestamp: {name: 'timestamp', type:Sequelize.DATE}
			}, 
			{ 
				sequelize,
				
				tableName: "audits",
				modelName: "audits",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			sequelize.literal('audits.log_id AS log_id'), 
			sequelize.literal('audits.action AS action'), 
			sequelize.literal('audits.page AS page'), 
			sequelize.literal('audits.record_id AS record_id'), 
			sequelize.literal('audits.user_ip AS user_ip'), 
			sequelize.literal('audits.request_url AS request_url'), 
			sequelize.literal('audits.timestamp AS timestamp'), 
			sequelize.literal("users.id AS users_id"), 
			sequelize.literal("users.name AS users_name")
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			sequelize.literal('audits.log_id AS log_id'), 
			sequelize.literal('audits.action AS action'), 
			sequelize.literal('audits.page AS page'), 
			sequelize.literal('audits.record_id AS record_id'), 
			sequelize.literal('audits.user_ip AS user_ip'), 
			sequelize.literal('audits.request_url AS request_url'), 
			sequelize.literal('audits.timestamp AS timestamp'), 
			sequelize.literal("users.id AS users_id"), 
			sequelize.literal("users.name AS users_name")
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			sequelize.literal('audits.log_id AS log_id'), 
			sequelize.literal('audits.action AS action'), 
			sequelize.literal('audits.page AS page'), 
			sequelize.literal('audits.record_id AS record_id'), 
			sequelize.literal('audits.old_values AS old_values'), 
			sequelize.literal('audits.new_values AS new_values'), 
			sequelize.literal('audits.user_ip AS user_ip'), 
			sequelize.literal('audits.user_agent AS user_agent'), 
			sequelize.literal('audits.request_url AS request_url'), 
			sequelize.literal('audits.timestamp AS timestamp'), 
			sequelize.literal("users.id AS users_id"), 
			sequelize.literal("users.name AS users_name")
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			sequelize.literal('audits.log_id AS log_id'), 
			sequelize.literal('audits.action AS action'), 
			sequelize.literal('audits.page AS page'), 
			sequelize.literal('audits.record_id AS record_id'), 
			sequelize.literal('audits.old_values AS old_values'), 
			sequelize.literal('audits.new_values AS new_values'), 
			sequelize.literal('audits.user_ip AS user_ip'), 
			sequelize.literal('audits.user_agent AS user_agent'), 
			sequelize.literal('audits.request_url AS request_url'), 
			sequelize.literal('audits.timestamp AS timestamp'), 
			sequelize.literal("users.id AS users_id"), 
			sequelize.literal("users.name AS users_name")
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("Audits.action LIKE :search"), 
			sequelize.literal("Audits.page LIKE :search"), 
			sequelize.literal("Audits.user_ip LIKE :search"), 
			sequelize.literal("Audits.request_url LIKE :search"), 
			sequelize.literal("Users.username LIKE :search"), 
			sequelize.literal("Users.name LIKE :search"),
		];
	}

	
	
}
module.exports = Audits;
