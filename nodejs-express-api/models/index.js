
const Sequelize = require('sequelize');
const dbConfig    = require('../config.js').database;

const sequelize = new Sequelize(dbConfig.name, dbConfig.username, dbConfig.password, {
		dialect: dbConfig.type,
		host: dbConfig.host,
		port: dbConfig.port,
		pool: {
			max: 15,
			min: 5,
			idle: 20000,
			evict: 15000,
			acquire: 30000
		},
		define: {
			timestamps: false,
			freezeTableName: true
		},
		operatorsAliases: 0
	}
);


// Override timezone formatting
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
	return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss');
};

const Action_Types =  require("./action_types").init(sequelize, Sequelize);
const Items =  require("./items").init(sequelize, Sequelize);
const Measurements =  require("./measurements").init(sequelize, Sequelize);
const Stocks =  require("./stocks").init(sequelize, Sequelize);
const Types =  require("./types").init(sequelize, Sequelize);
const Users =  require("./users").init(sequelize, Sequelize);

const Op = Sequelize.Op;
module.exports = {
	sequelize,
	Op,
	Action_Types,
	Items,
	Measurements,
	Stocks,
	Types,
	Users
}
