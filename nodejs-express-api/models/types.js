
const BaseModel = require("./basemodel");
class Types extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				type: {name: 'type', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				
				tableName: "types",
				modelName: "types",
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
			'type'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'type'
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
