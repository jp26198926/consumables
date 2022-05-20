
const BaseModel = require("./basemodel");
class Permissions extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				permission_id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				permission: {name: 'permission', type:Sequelize.STRING},
				role_id: {name: 'role_id', type:Sequelize.INTEGER}
			}, 
			{ 
				sequelize,
				
				tableName: "permissions",
				modelName: "permissions",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'permission_id', 
			'permission', 
			sequelize.literal('`roles`.`role_name` AS `roles_role_name`'), 
			'role_id'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'permission_id', 
			'permission', 
			sequelize.literal('`roles`.`role_name` AS `roles_role_name`'), 
			'role_id'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'permission_id', 
			'permission', 
			sequelize.literal('`roles`.`role_name` AS `roles_role_name`'), 
			'role_id'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'permission_id', 
			'permission', 
			sequelize.literal('`roles`.`role_name` AS `roles_role_name`'), 
			'role_id'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'permission_id', 
			'permission', 
			'role_id'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("permission LIKE :search"),
		];
	}

	
	
}
module.exports = Permissions;
