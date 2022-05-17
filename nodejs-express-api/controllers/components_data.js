/** Express router providing related routes to page component data
 * @module routers/components_data
 * @requires express
 * @requires config - app config
 * @requires models- app model module
 */


 /**
 * express module
 * @const
 */
const express = require('express');


/**
 * Express router to mount user page functions.
 * @type {object}
 * @const
 */
const router = express.Router();


/**
 * App config module
 * @const
 */
const config = require('../config.js');


/**
 *  models
 * @const
 */
const models = require('../models/index.js');
const utils = require('../helpers/utils.js');


const sequelize = models.sequelize;
const Op = models.Op; // sequelize query operators


 /**
 * Route to get type_id_option_list records
 * @route {GET} /components_data/type_id_option_list
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/type_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT id AS value,type AS label FROM types ORDER BY type ASC` ;
		let records = await sequelize.query(sqltext, { type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});


 /**
 * Route to get measurement_id_option_list records
 * @route {GET} /components_data/measurement_id_option_list
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/measurement_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT id AS value,name AS label FROM measurements ORDER BY name ASC` ;
		let records = await sequelize.query(sqltext, { type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});
module.exports = router;
