/** Express router providing Permissions related routes
 * @module routers/Permissions
 * @requires express
 * @requires config - app config
 * @requires utils - app utils functions
 * @requires express-validator - form validation module
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
 * App utils functions module
 * @const
 */
const utils = require('../helpers/utils.js');


/**
 * Form input validation module
 * @const
 */
const { body, validationResult } = require('express-validator');


/**
 * Permissions models
 * @const
 */
const models = require('../models/index.js');
const Permissions = models.Permissions;


const sequelize = models.sequelize; // sequelize functions and operations
const Op = models.Op; // sequelize query operators


Permissions.belongsTo(models.Roles, {foreignKey: 'role_id', as: 'roles' });


/**
 * Route to list permissions records
 * @route {GET} /permissions/index/{fieldname}/{fieldvalue}
 * @param {array} path - Array of express paths
 * @param {callback} middleware - Express middleware.
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req, res) => {  
	try{
		let query = {};  // sequelize query object
		let where = {};  // sequelize where conditions
		let replacements = {};  // sequelize query params
		let fieldname = req.params.fieldname;
		let fieldvalue = req.params.fieldvalue;
		
		if (fieldname){
			where[Op.and] = [
				sequelize.literal(`(${fieldname} = :fieldvalue)`)
			];
			replacements.fieldvalue = fieldvalue;
		}
		let joinTables = []; // hold list of join tables
		joinTables.push({
			model: models.Roles,
			required: true,
			as: 'roles',
			attributes: [], //already set on the query attributes using sequelize literal
		})
		query['include'] = joinTables;
		let search = req.query.search;
		if(search){
			let searchFields = Permissions.searchFields();
			where[Op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = Permissions.getOrderBy(req);
		query.attributes = Permissions.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 20;
		let result = await Permissions.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Permissions record
 * @route {GET} /permissions/view/{recid}
 * @param {array} path - Array of express paths
 * @param {callback} middleware - Express middleware.
 */
router.get(['/view/:recid'], async (req, res) => {
	try{
		let recid = req.params.recid || null;
		let query = {}
		let where = {}
		let joinTables = []; // hold list of join tables
		joinTables.push({
			model: models.Roles,
			required: true,
			as: 'roles',
			attributes: [], //already set on the query attributes using sequelize literal
		})
		query['include'] = joinTables;
		where['permission_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = Permissions.viewFields();
		let record = await Permissions.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to insert Permissions record
 * @route {POST} /permissions/add
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/add/' , 
	[
		body('permission').not().isEmpty(),
		body('role_id').optional().isNumeric(),
	]
, async function (req, res) {
	try{
		let errors = validationResult(req); // get validation errors if any
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let modeldata = req.body;
		
		//save Permissions record
		let record = await Permissions.create(modeldata);
		//await record.reload(); //reload the record from database
		let recid =  record['permission_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Permissions record for edit
 * @route {GET} /permissions/edit/{recid}
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		let recid = req.params.recid;
		let query = {};
		let where = {};
		where['permission_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = Permissions.editFields();
		let record = await Permissions.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to update  Permissions record
 * @route {POST} /permissions/edit/{recid}
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/edit/:recid' , 
	[
		body('permission').optional({nullable: true}).not().isEmpty(),
		body('role_id').optional().isNumeric(),
	]
, async (req, res) => {
	try{
		let errors = validationResult(req); // get validation errors if any
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let recid = req.params.recid;
		let modeldata = req.body;
		let query = {};
		let where = {};
		where['permission_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = Permissions.editFields();
		let record = await Permissions.findOne(query);
		if(!record){
			return res.notFound();
		}
		await Permissions.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Permissions record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @route {GET} /permissions/delete/{recid}
 * @param {array} path - Array of express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		let recid = req.params.recid || '';
		recid = recid.split(',');
		let query = {};
		let where = {};
		where['permission_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await Permissions.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await Permissions.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
module.exports = router;
