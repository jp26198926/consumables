
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
				department_id: {name: 'department_id', type:Sequelize.INTEGER}
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
			sequelize.literal('stocks.id AS id'), 
			sequelize.literal("action_types.action_type AS action_types_action_type"), 
			sequelize.literal('stocks.date AS date'), 
			sequelize.literal('stocks.qty AS qty'), 
			sequelize.literal("items.barcode AS items_barcode"), 
			sequelize.literal("items.name AS items_name"), 
			sequelize.literal('stocks.expiry AS expiry'), 
			sequelize.literal('stocks.remarks AS remarks'), 
			sequelize.literal("action_types.id AS action_types_id"), 
			sequelize.literal("items.id AS items_id"), 
			sequelize.literal('stocks.department_id AS department_id')
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			sequelize.literal('stocks.id AS id'), 
			sequelize.literal("action_types.action_type AS action_types_action_type"), 
			sequelize.literal('stocks.date AS date'), 
			sequelize.literal('stocks.qty AS qty'), 
			sequelize.literal("items.barcode AS items_barcode"), 
			sequelize.literal("items.name AS items_name"), 
			sequelize.literal('stocks.expiry AS expiry'), 
			sequelize.literal('stocks.remarks AS remarks'), 
			sequelize.literal("action_types.id AS action_types_id"), 
			sequelize.literal("items.id AS items_id"), 
			sequelize.literal('stocks.department_id AS department_id')
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			sequelize.literal('stocks.id AS id'), 
			sequelize.literal("action_types.action_type AS action_types_action_type"), 
			sequelize.literal('stocks.date AS date'), 
			sequelize.literal('stocks.qty AS qty'), 
			sequelize.literal("items.barcode AS items_barcode"), 
			sequelize.literal("items.name AS items_name"), 
			sequelize.literal('stocks.expiry AS expiry'), 
			sequelize.literal('stocks.remarks AS remarks'), 
			sequelize.literal("action_types.id AS action_types_id"), 
			sequelize.literal("items.id AS items_id"), 
			sequelize.literal('stocks.date_created AS date_created'), 
			sequelize.literal('stocks.date_updated AS date_updated'), 
			sequelize.literal('stocks.created_by AS created_by'), 
			sequelize.literal('stocks.updated_by AS updated_by'), 
			sequelize.literal('stocks.department_id AS department_id')
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			sequelize.literal('stocks.id AS id'), 
			sequelize.literal("action_types.action_type AS action_types_action_type"), 
			sequelize.literal('stocks.date AS date'), 
			sequelize.literal('stocks.qty AS qty'), 
			sequelize.literal("items.barcode AS items_barcode"), 
			sequelize.literal("items.name AS items_name"), 
			sequelize.literal('stocks.expiry AS expiry'), 
			sequelize.literal('stocks.remarks AS remarks'), 
			sequelize.literal("action_types.id AS action_types_id"), 
			sequelize.literal("items.id AS items_id"), 
			sequelize.literal('stocks.date_created AS date_created'), 
			sequelize.literal('stocks.date_updated AS date_updated'), 
			sequelize.literal('stocks.created_by AS created_by'), 
			sequelize.literal('stocks.updated_by AS updated_by'), 
			sequelize.literal('stocks.department_id AS department_id')
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
			'remarks', 
			'updated_by', 
			'department_id'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("Action_Types.action_type LIKE :search"), 
			sequelize.literal("Stocks.date LIKE :search"), 
			sequelize.literal("Stocks.qty LIKE :search"), 
			sequelize.literal("Items.barcode LIKE :search"), 
			sequelize.literal("Items.name LIKE :search"), 
			sequelize.literal("Stocks.remarks LIKE :search"),
		];
	}

	
	
}
module.exports = Stocks;
