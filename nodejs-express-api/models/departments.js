
const BaseModel = require("./basemodel");
class Departments extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				department: {name: 'department', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				
				tableName: "departments",
				modelName: "departments",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'department'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'department'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'department'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'department'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'department'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("department LIKE :search"),
		];
	}

	
	
}
module.exports = Departments;
