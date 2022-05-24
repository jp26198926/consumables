
const BaseModel = require("./basemodel");
class Cv_Updated_By extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true  },
				name: {name: 'name', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				
				tableName: "cv_updated_by",
				modelName: "cv_updated_by",
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

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("name LIKE :search"),
		];
	}

	
	
}
module.exports = Cv_Updated_By;
