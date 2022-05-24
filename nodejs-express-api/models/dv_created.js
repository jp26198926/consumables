
const BaseModel = require("./basemodel");
class Dv_Created extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true  },
				name: {name: 'name', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				
				tableName: "dv_created",
				modelName: "dv_created",
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
			sequelize.literal("name LIKE :search"),
		];
	}

	
	
}
module.exports = Dv_Created;
