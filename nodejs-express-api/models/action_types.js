
const BaseModel = require("./basemodel");
class Action_Types extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				action_type: {name: 'action_type', type:Sequelize.STRING},
				date_created: {name: 'date_created', type:Sequelize.DATE},
				date_updated: {name: 'date_updated', type:Sequelize.DATE}
			}, 
			{ 
				sequelize,
				
				tableName: "action_types",
				modelName: "action_types",timestamps:true,
				createdAt: 'date_created',
				updatedAt: 'date_updated',
				
				
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
			'action_type', 
			'date_created', 
			'date_updated'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'action_type', 
			'date_created', 
			'date_updated'
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
