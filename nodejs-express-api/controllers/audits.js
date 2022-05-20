/** Express router providing Audits related routes
 * @module routers/Audits
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
 * Audits models
 * @const
 */
const models = require('../models/index.js');
const Audits = models.Audits;


const sequelize = models.sequelize; // sequelize functions and operations
const Op = models.Op; // sequelize query operators


const AuditLog = require('../helpers/auditlog.js');
let oldValues = null;
let newValues = null;
Audits.belongsTo(models.Users, {foreignKey: 'user_ip', as: 'users' });


/**
 * Route to list audits records
 * @route {GET} /audits/index/{fieldname}/{fieldvalue}
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
			model: models.Users,
			required: false,
			as: 'users',
			attributes: [], //already set on the query attributes using sequelize literal
		})
		query['include'] = joinTables;
		let search = req.query.search;
		if(search){
			let searchFields = Audits.searchFields();
			where[Op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = Audits.getOrderBy(req);
		query.attributes = Audits.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 20;
		let result = await Audits.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Audits record
 * @route {GET} /audits/view/{recid}
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
			model: models.Users,
			required: false,
			as: 'users',
			attributes: [], //already set on the query attributes using sequelize literal
		})
		query['include'] = joinTables;
		where[Op.and] = sequelize.literal('audits.log_id = :recid');
		query.replacements = {
			recid
		}
		query.raw = true;
		query.where = where;
		query.attributes = Audits.viewFields();
		let record = await Audits.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});
module.exports = router;
