/** Express router providing Items related routes
 * @module routers/Items
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
 * Items models
 * @const
 */
const models = require('../models/index.js');
const Items = models.Items;


const sequelize = models.sequelize; // sequelize functions and operations
const Op = models.Op; // sequelize query operators


const AuditLog = require('../helpers/auditlog.js');
let oldValues = null;
let newValues = null;
Items.belongsTo(models.Types, {foreignKey: 'type_id', as: 'types' });
Items.belongsTo(models.Measurements, {foreignKey: 'measurement_id', as: 'measurements' });


/**
 * Route to list items records
 * @route {GET} /items/index/{fieldname}/{fieldvalue}
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
			model: models.Types,
			required: false,
			as: 'types',
			attributes: [], //already set on the query attributes using sequelize literal
		})
		joinTables.push({
			model: models.Measurements,
			required: false,
			as: 'measurements',
			attributes: [], //already set on the query attributes using sequelize literal
		})
		query['include'] = joinTables;
		let search = req.query.search;
		if(search){
			let searchFields = Items.searchFields();
			where[Op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = Items.getOrderBy(req);
		query.attributes = Items.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 20;
		let result = await Items.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Items record
 * @route {GET} /items/view/{recid}
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
			model: models.Types,
			required: false,
			as: 'types',
			attributes: [], //already set on the query attributes using sequelize literal
		})
		joinTables.push({
			model: models.Measurements,
			required: false,
			as: 'measurements',
			attributes: [], //already set on the query attributes using sequelize literal
		})
		query['include'] = joinTables;
		where[Op.and] = sequelize.literal('items.id = :recid');
		query.replacements = {
			recid
		}
		query.raw = true;
		query.where = where;
		query.attributes = Items.viewFields();
		let record = await Items.findOne(query);
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
 * Route to insert Items record
 * @route {POST} /items/add
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/add/' , 
	[
		body('barcode').not().isEmpty(),
		body('name').not().isEmpty(),
		body('type_id').optional().isNumeric(),
		body('measurement_id').optional().isNumeric(),
	]
, async function (req, res) {
	try{
		let errors = validationResult(req); // get validation errors if any
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let modeldata = req.body;
		
		//save Items record
		let record = await Items.create(modeldata);
		//await record.reload(); //reload the record from database
		let recid =  record['id'];
		newValues = JSON.stringify(record); 
		AuditLog.writeToLog(req, {recid, oldValues, newValues});
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Items record for edit
 * @route {GET} /items/edit/{recid}
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		let recid = req.params.recid;
		let query = {};
		let where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = Items.editFields();
		let record = await Items.findOne(query);
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
 * Route to update  Items record
 * @route {POST} /items/edit/{recid}
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/edit/:recid' , 
	[
		body('barcode').optional({nullable: true}).not().isEmpty(),
		body('name').optional({nullable: true}).not().isEmpty(),
		body('type_id').optional().isNumeric(),
		body('measurement_id').optional().isNumeric(),
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
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = Items.editFields();
		let record = await Items.findOne(query);
		if(!record){
			return res.notFound();
		}
		oldValues = JSON.stringify(record); //for audit trail
		await Items.update(modeldata, {where: where});
		record = await Items.findOne(query);//for audit trail
		newValues = JSON.stringify(record); 
		AuditLog.writeToLog(req, {recid, oldValues, newValues});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Items record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @route {GET} /items/delete/{recid}
 * @param {array} path - Array of express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		let recid = req.params.recid || '';
		recid = recid.split(',');
		let query = {};
		let where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await Items.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			oldValues = JSON.stringify(record); //for audit trail
			AuditLog.writeToLog(req, { recid: record['id'], oldValues });
		});
		await Items.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
module.exports = router;
