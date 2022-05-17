
const BaseModel = require("./basemodel");
class Adjustment_Types extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				adjustment_type: {name: 'adjustment_type', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				
				tableName: "adjustment_types",
				modelName: "adjustment_types",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'adjustment_type'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'adjustment_type'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'adjustment_type'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'adjustment_type'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'adjustment_type'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("adjustment_type LIKE :search"),
		];
	}

	
	
}
module.exports = Adjustment_Types;
