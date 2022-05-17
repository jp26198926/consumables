
const BaseModel = require("./basemodel");
class Action_Types extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				action_type: {name: 'action_type', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				
				tableName: "action_types",
				modelName: "action_types",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'action_type'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'action_type'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'action_type'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'action_type'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'action_type'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("action_type LIKE :search"),
		];
	}

	
	
}
module.exports = Action_Types;
