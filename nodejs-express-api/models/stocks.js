
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
				action_id: {name: 'action_id', type:Sequelize.INTEGER},
				date_created: {name: 'date_created', type:Sequelize.DATE},
				date_updated: {name: 'date_updated', type:Sequelize.DATE},
				date_deleted: {name: 'date_deleted', type:Sequelize.DATE},
				expiry: {name: 'expiry', type:Sequelize.DATEONLY},
				created_by: {name: 'created_by', type:Sequelize.INTEGER},
				updated_by: {name: 'updated_by', type:Sequelize.INTEGER},
				department_id: {name: 'department_id', type:Sequelize.INTEGER},
				measurement_id: {name: 'measurement_id', type:Sequelize.INTEGER}
			}, 
			{ 
				sequelize,
				
				tableName: "stocks",
				modelName: "stocks",timestamps:true,
				createdAt: 'date_created',
				updatedAt: 'date_updated',
				
					paranoid: true, deletedAt: 'date_deleted'
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'qty', 
			'expiry', 
			'remarks', 
			'measurement_id'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'qty', 
			'expiry', 
			'remarks', 
			'measurement_id'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'qty', 
			'expiry', 
			'remarks', 
			'date_created', 
			'date_updated', 
			'date_deleted', 
			'measurement_id'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'date', 
			'qty', 
			'expiry', 
			'remarks', 
			'date_created', 
			'date_updated', 
			'date_deleted', 
			'measurement_id'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'action_id', 
			'date', 
			'item_id', 
			'qty', 
			'expiry', 
			'department_id', 
			'remarks', 
			'updated_by'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("date LIKE :search"), 
			sequelize.literal("qty LIKE :search"), 
			sequelize.literal("expiry LIKE :search"), 
			sequelize.literal("remarks LIKE :search"),
		];
	}

	
	
}
module.exports = Stocks;
