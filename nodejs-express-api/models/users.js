
const BaseModel = require("./basemodel");
class Users extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				username: {name: 'username', type:Sequelize.STRING},
				email: {name: 'email', type:Sequelize.STRING},
				password: {name: 'password', type:Sequelize.STRING},
				telelphone: {name: 'telelphone', type:Sequelize.STRING},
				photo: {name: 'photo', type:Sequelize.STRING},
				name: {name: 'name', type:Sequelize.STRING},
				user_role_id: {name: 'user_role_id', type:Sequelize.INTEGER}
			}, 
			{ 
				sequelize,
				
				tableName: "users",
				modelName: "users",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'username', 
			'email', 
			'telelphone', 
			'photo', 
			sequelize.literal('`roles`.`role_name` AS `roles_role_name`'), 
			'user_role_id'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'username', 
			'email', 
			'telelphone', 
			'photo', 
			sequelize.literal('`roles`.`role_name` AS `roles_role_name`'), 
			'user_role_id'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'username', 
			'email', 
			'telelphone', 
			sequelize.literal('`roles`.`role_name` AS `roles_role_name`'), 
			'user_role_id'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'username', 
			'email', 
			'telelphone', 
			sequelize.literal('`roles`.`role_name` AS `roles_role_name`'), 
			'user_role_id'
		];
	}

	static accounteditFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'username', 
			'telelphone', 
			'photo', 
			'name'
		];
	}

	static accountviewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'username', 
			'email', 
			'telelphone', 
			'user_role_id'
		];
	}

	static exportAccountviewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'username', 
			'email', 
			'telelphone', 
			'user_role_id'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'username', 
			'email', 
			'telelphone', 
			'photo', 
			'user_role_id'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("name LIKE :search"), 
			sequelize.literal("username LIKE :search"), 
			sequelize.literal("email LIKE :search"), 
			sequelize.literal("telelphone LIKE :search"),
		];
	}

	
	
}
module.exports = Users;
