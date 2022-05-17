
const BaseModel = require("./basemodel");
class Adjustments extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				date: {name: 'date', type:Sequelize.STRING},
				item_id: {name: 'item_id', type:Sequelize.STRING},
				old_qty: {name: 'old_qty', type:Sequelize.STRING},
				new_qty: {name: 'new_qty', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				
				tableName: "adjustments",
				modelName: "adjustments",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'item_id', 
			'old_qty', 
			'new_qty'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'item_id', 
			'old_qty', 
			'new_qty'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'item_id', 
			'old_qty', 
			'new_qty'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'item_id', 
			'old_qty', 
			'new_qty'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'item_id', 
			'old_qty', 
			'new_qty'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("old_qty LIKE :search"), 
			sequelize.literal("new_qty LIKE :search"),
		];
	}

	
	
}
module.exports = Adjustments;
