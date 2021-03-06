
const BaseModel = require("./basemodel");
class Items extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				barcode: {name: 'barcode', type:Sequelize.STRING},
				name: {name: 'name', type:Sequelize.STRING},
				type_id: {name: 'type_id', type:Sequelize.INTEGER},
				measurement_id: {name: 'measurement_id', type:Sequelize.INTEGER},
				date_created: {name: 'date_created', type:Sequelize.DATE},
				date_updated: {name: 'date_updated', type:Sequelize.DATE},
				date_deleted: {name: 'date_deleted', type:Sequelize.DATE}
			}, 
			{ 
				sequelize,
				
				tableName: "items",
				modelName: "items",timestamps:true,
				createdAt: 'date_created',
				updatedAt: 'date_updated',
				
					paranoid: true, deletedAt: 'date_deleted'
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			sequelize.literal('items.id AS id'), 
			sequelize.literal('items.barcode AS barcode'), 
			sequelize.literal('items.name AS name'), 
			sequelize.literal("types.id AS types_id"), 
			sequelize.literal("types.type AS types_type"), 
			sequelize.literal("measurements.id AS measurements_id"), 
			sequelize.literal("measurements.name AS measurements_name")
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			sequelize.literal('items.id AS id'), 
			sequelize.literal('items.barcode AS barcode'), 
			sequelize.literal('items.name AS name'), 
			sequelize.literal("types.id AS types_id"), 
			sequelize.literal("types.type AS types_type"), 
			sequelize.literal("measurements.id AS measurements_id"), 
			sequelize.literal("measurements.name AS measurements_name")
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			sequelize.literal('items.id AS id'), 
			sequelize.literal('items.barcode AS barcode'), 
			sequelize.literal('items.name AS name'), 
			sequelize.literal("types.id AS types_id"), 
			sequelize.literal("types.type AS types_type"), 
			sequelize.literal("measurements.id AS measurements_id"), 
			sequelize.literal("measurements.name AS measurements_name"), 
			sequelize.literal('items.date_created AS date_created'), 
			sequelize.literal('items.date_updated AS date_updated')
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			sequelize.literal('items.id AS id'), 
			sequelize.literal('items.barcode AS barcode'), 
			sequelize.literal('items.name AS name'), 
			sequelize.literal("types.id AS types_id"), 
			sequelize.literal("types.type AS types_type"), 
			sequelize.literal("measurements.id AS measurements_id"), 
			sequelize.literal("measurements.name AS measurements_name"), 
			sequelize.literal('items.date_created AS date_created'), 
			sequelize.literal('items.date_updated AS date_updated')
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
			sequelize.literal("Items.barcode LIKE :search"), 
			sequelize.literal("Items.name LIKE :search"), 
			sequelize.literal("Types.type LIKE :search"), 
			sequelize.literal("Measurements.code LIKE :search"), 
			sequelize.literal("Measurements.name LIKE :search"),
		];
	}

	
	
}
module.exports = Items;
