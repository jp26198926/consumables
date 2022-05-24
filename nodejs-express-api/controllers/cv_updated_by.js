/** Express router providing Cv_Updated_By related routes
 * @module routers/Cv_Updated_By
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
 * Cv_Updated_By models
 * @const
 */
const models = require('../models/index.js');
const Cv_Updated_By = models.Cv_Updated_By;


const sequelize = models.sequelize; // sequelize functions and operations
const Op = models.Op; // sequelize query operators


const AuditLog = require('../helpers/auditlog.js');
let oldValues = null;
let newValues = null;


/**
 * Route to list records based on custom sql query
 * @route {GET} /cv_updated_by
 * @param {array} path - Array of express paths
 * @param {callback} middleware - Express middleware.
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'],  async (req, res) => {
	try{
		let sqltext = `SELECT  users.id, users.name FROM users` ;
		let records = await sequelize.query(sqltext, {replacements: queryParams, type: sequelize.QueryTypes.SELECT });
		let record_count = records.length;
		let total_records = record_count;
		let total_page = 1;
		let data = {
			total_records,
			record_count,
			total_page,
			records
		}
		return res.ok(data);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});
module.exports = router;
