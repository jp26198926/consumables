
const BaseModel = require("./basemodel");
class Items extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				barcode: {name: 'barcode', type:Sequelize.STRING},
				name: {name: 'name', type:Sequelize.STRING},
				type_id: {name: 'type_id', type:Sequelize.INTEGER},
				measurement_id: {name: 'measurement_id', type:Sequelize.INTEGER}
			}, 
			{ 
				sequelize,
				
				tableName: "items",
				modelName: "items",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'barcode', 
			'name', 
			'type_id', 
			'measurement_id'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'barcode', 
			'name', 
			'type_id', 
			'measurement_id'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'barcode', 
			'name', 
			'type_id', 
			'measurement_id'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'barcode', 
			'name', 
			'type_id', 
			'measurement_id'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'barcode', 
			'name', 
			'type_id', 
			'measurement_id'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("barcode LIKE :search"), 
			sequelize.literal("name LIKE :search"),
		];
	}

	
	
}
module.exports = Items;
