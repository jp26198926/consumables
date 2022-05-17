
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
				name: {name: 'name', type:Sequelize.STRING}
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
			'photo'
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
			'photo'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'username', 
			'email', 
			'telelphone'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'username', 
			'email', 
			'telelphone'
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
			'username', 
			'email', 
			'telelphone', 
			'name'
		];
	}

	static exportAccountviewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'username', 
			'email', 
			'telelphone', 
			'name'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'username', 
			'telelphone', 
			'photo'
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
