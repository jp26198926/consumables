
const BaseModel = require("./basemodel");
class Stocks extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				date: {name: 'date', type:Sequelize.DATEONLY},
				item_id: {name: 'item_id', type:Sequelize.INTEGER},
				qty: {name: 'qty', type:Sequelize.DECIMAL},
				remarks: {name: 'remarks', type:Sequelize.STRING},
				action_id: {name: 'action_id', type:Sequelize.INTEGER}
			}, 
			{ 
				sequelize,
				
				tableName: "stocks",
				modelName: "stocks",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'item_id', 
			'qty', 
			'remarks', 
			'action_id'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'item_id', 
			'qty', 
			'remarks', 
			'action_id'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'item_id', 
			'qty', 
			'remarks', 
			'action_id'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'item_id', 
			'qty', 
			'remarks', 
			'action_id'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'item_id', 
			'qty', 
			'remarks', 
			'action_id'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("remarks LIKE :search"),
		];
	}

	
	
}
module.exports = Stocks;
