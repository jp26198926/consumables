/** Express router providing user account related routes
 * @module routers/account
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
 * App utils functions module
 * @const
 */
const utils = require('../helpers/utils.js');


/**
 * App config module
 * @const
 */
const config = require('../config.js');


/**
 * Form input validation module
 * @const
 */
const { body, validationResult } = require('express-validator');


/**
 *  models
 * @const
 */
const models = require('../models/index.js');
const Users = models.Users;


const sequelize = models.sequelize; // sequelize functions and operations
const Op = models.Op; // sequelize query operators


/**
 * Route to view user account record
 * @route {GET} /account
 * @param {array} path - Array of express paths
 * @param {callback} middleware - Express middleware.
 */
router.get(['/','/index'], async (req, res) => {
	try{
		let userId = recid = req.user.id;
		let query = {};
		let where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = Users.accountviewFields();
		let record = await Users.findOne(query);
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
 * Route to get  user account record for edit
 * @route {GET} /account/edit
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/edit', async (req, res) => {
	try{
		let userId = recid = req.user.id;
		let query = {};
		let where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = Users.accounteditFields();
		let record = await Users.findOne(query);
		if(!record){
			return res.badRequest("No record found");
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to update  user account record
 * @route {POST} /account/edit/{recid}
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/edit' , 
	[
		body('username').optional({nullable: true}).not().isEmpty(),
		body('telelphone').optional(),
		body('photo').optional(),
		body('name').optional({nullable: true}).not().isEmpty(),
	]
, async (req, res) => {
	try{
		// Finds the validation errors in this request and wraps them in an object with handy functions
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let userId = recid = req.user.id;
		let modeldata = req.body;
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.photo !== undefined) {
			let fileInfo = utils.moveUploadedFiles(modeldata.photo, "photo");
			modeldata.photo = fileInfo.filepath;
		}
		let query = {};
		let where = {};
		where['id'] = recid;
		query.where = where;
		query.raw = true;
		query.attributes = Users.accounteditFields();
		let record = await Users.findOne(query);
		if(!record){
			return res.notFound();
		}
		await Users.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/currentuserdata', async function (req, res)
{
	let user = req.user;
    return res.ok(user);
});


/**
 * Route to change user password
 * @route {POST} /account
 * @param {array} path - Array of express paths
 * @param {callback} middleware - Express middleware.
 */
router.post('/changepassword' , 
	[
		body('oldpassword').not().isEmpty(),
		body('newpassword').not().isEmpty(),
		body('confirmpassword').not().isEmpty().custom((value, {req}) => (value === req.body.newpassword))
	]
, async function (req, res) {
	try{
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let oldPassword = req.body.oldpassword;
		let newPassword = req.body.newpassword;
		let userId = recid = req.user.id;
		let query = {};
		let where = {};
		query.raw = true;
		query.where = where;
		query.attributes = ['password'];
		let user = await Users.findOne(query);
		let currentPasswordHash = user.password;
		if(!utils.passwordVerify(oldPassword, currentPasswordHash)){
			return res.badRequest("Current password is incorrect");
		}
		let modeldata = {
			password: utils.passwordHash(newPassword)
		}
		await Users.update(modeldata, {where: where});
		return res.ok("Password change completed");
	}
	catch(err){
		return res.serverError(err);
	}
});
module.exports = router;
