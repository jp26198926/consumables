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
 * Route to get action_type_option_list records
 * @route {GET} /components_data/action_type_option_list
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/action_type_option_list', async (req, res) => {
	try{
		let sqltext = `` ;
		let records = await sequelize.query(sqltext, { type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});


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


 /**
 * Route to get role_id_option_list records
 * @route {GET} /components_data/role_id_option_list
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/role_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT role_id as value, role_name as label FROM roles` ;
		let records = await sequelize.query(sqltext, { type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});


 /**
 * Route to get action_id_option_list records
 * @route {GET} /components_data/action_id_option_list
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/action_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT id AS value,action_type AS label FROM action_types ORDER BY action_type ASC` ;
		let records = await sequelize.query(sqltext, { type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});


 /**
 * Route to get item_id_option_list records
 * @route {GET} /components_data/item_id_option_list
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/item_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT id AS value,name AS label,barcode AS caption FROM items ORDER BY name ASC` ;
		let queryParams = {};
		queryParams.search = '%' + req.query.search + '%';
		let records = await sequelize.query(sqltext, {replacements: queryParams, type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});


 /**
 * Route to get department_id_option_list records
 * @route {GET} /components_data/department_id_option_list
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/department_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT id AS value,department AS label FROM departments ORDER BY department ASC` ;
		let records = await sequelize.query(sqltext, { type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @route {GET} /components_data/users_username_exist/{fieldvalue}
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/users_username_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await models.Users.count({ where:{ 'username': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @route {GET} /components_data/users_email_exist/{fieldvalue}
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/users_email_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await models.Users.count({ where:{ 'email': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});
module.exports = router;
