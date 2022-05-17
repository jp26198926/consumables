
const BaseModel = require("./basemodel");
class Types extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				type: {name: 'type', type:Sequelize.STRING},
				date_created: {name: 'date_created', type:Sequelize.DATE},
				date_updated: {name: 'date_updated', type:Sequelize.DATE}
			}, 
			{ 
				sequelize,
				
				tableName: "types",
				modelName: "types",timestamps:true,
				createdAt: 'date_created',
				updatedAt: 'date_updated',
				
				
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'type'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'type'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'type', 
			'date_created', 
			'date_updated'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'type', 
			'date_created', 
			'date_updated'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'type'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("type LIKE :search"),
		];
	}

	
	
}
module.exports = Types;
