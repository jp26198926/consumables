
const BaseModel = require("./basemodel");
class Measurements extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				code: {name: 'code', type:Sequelize.STRING},
				name: {name: 'name', type:Sequelize.STRING},
				date_created: {name: 'date_created', type:Sequelize.DATE},
				date_updated: {name: 'date_updated', type:Sequelize.DATE}
			}, 
			{ 
				sequelize,
				
				tableName: "measurements",
				modelName: "measurements",timestamps:true,
				createdAt: 'date_created',
				updatedAt: 'date_updated',
				
				
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'code', 
			'name'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'code', 
			'name'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'code', 
			'name', 
			'date_created', 
			'date_updated'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'code', 
			'name', 
			'date_created', 
			'date_updated'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'code', 
			'name'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("code LIKE :search"), 
			sequelize.literal("name LIKE :search"),
		];
	}

	
	
}
module.exports = Measurements;
