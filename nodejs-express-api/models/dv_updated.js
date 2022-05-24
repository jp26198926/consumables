
const BaseModel = require("./basemodel");
class Dv_Updated extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true  },
				name: {name: 'name', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				
				tableName: "dv_updated",
				modelName: "dv_updated",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("Dv_Updated.name LIKE :search"),
		];
	}

	
	
}
module.exports = Dv_Updated;
