/** Express router providing Stocks related routes
 * @module routers/Stocks
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
 * Stocks models
 * @const
 */
const models = require('../models/index.js');
const Stocks = models.Stocks;


const sequelize = models.sequelize; // sequelize functions and operations
const Op = models.Op; // sequelize query operators


const StocksListExport = require('../exports/StocksList')
Stocks.belongsTo(models.Action_Types, {foreignKey: 'action_id', as: 'action_types' });
Stocks.belongsTo(models.Items, {foreignKey: 'item_id', as: 'items' });


/**
 * Route to list stocks records
 * @route {GET} /stocks/index/{fieldname}/{fieldvalue}
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
			model: models.Action_Types,
			required: false,
			as: 'action_types',
			attributes: [], //already set on the query attributes using sequelize literal
		})
		joinTables.push({
			model: models.Items,
			required: false,
			as: 'items',
			attributes: [], //already set on the query attributes using sequelize literal
		})
		query['include'] = joinTables;
		let search = req.query.search;
		if(search){
			let searchFields = Stocks.searchFields();
			where[Op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = Stocks.getOrderBy(req);
		if(req.query.export){
			query.attributes = Stocks.exportListFields(sequelize);
			let records = await Stocks.findAll(query);
			return StocksListExport.export(records, req, res)
		}
		query.attributes = Stocks.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 20;
		let result = await Stocks.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Stocks record
 * @route {GET} /stocks/view/{recid}
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
			model: models.Action_Types,
			required: false,
			as: 'action_types',
			attributes: [], //already set on the query attributes using sequelize literal
		})
		joinTables.push({
			model: models.Items,
			required: false,
			as: 'items',
			attributes: [], //already set on the query attributes using sequelize literal
		})
		query['include'] = joinTables;
		where[Op.and] = sequelize.literal('stocks.id = :recid');
		query.replacements = {
			recid
		}
		query.raw = true;
		query.where = where;
		query.attributes = Stocks.viewFields();
		let record = await Stocks.findOne(query);
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
 * Route to insert Stocks record
 * @route {POST} /stocks/add
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/add/' , 
	[
		body('action_id').optional().isNumeric(),
		body('date').not().isEmpty(),
		body('item_id').not().isEmpty().isNumeric(),
		body('qty').not().isEmpty().isNumeric(),
		body('remarks').optional(),
	]
, async function (req, res) {
	try{
		let errors = validationResult(req); // get validation errors if any
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let modeldata = req.body;
		await beforeAdd(modeldata, req);
		
		//save Stocks record
		let record = await Stocks.create(modeldata);
		//await record.reload(); //reload the record from database
		let recid =  record['id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});
/**
    * Before create new record
    * @param {object} postdata // validated form data used to create new record
    */
async function beforeAdd(postdata, req){
    //enter statement here
    //check if action is release, 1-receive, 2-release, 3-adjustment
    if (postdata.action_id == 2){
        //get absolute value of qty then add negative sign
        postdata.qty = -(Math.abs(Number(postdata.qty)));
    }
}


/**
 * Route to get  Stocks record for edit
 * @route {GET} /stocks/edit/{recid}
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
		query.attributes = Stocks.editFields();
		let record = await Stocks.findOne(query);
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
 * Route to update  Stocks record
 * @route {POST} /stocks/edit/{recid}
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/edit/:recid' , 
	[
		body('action_id').optional().isNumeric(),
		body('date').optional({nullable: true}).not().isEmpty(),
		body('item_id').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('qty').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('remarks').optional(),
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
		query.attributes = Stocks.editFields();
		let record = await Stocks.findOne(query);
		if(!record){
			return res.notFound();
		}
		await Stocks.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Stocks record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @route {GET} /stocks/delete/{recid}
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
		let records = await Stocks.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await Stocks.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
module.exports = router;
