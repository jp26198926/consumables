/** Express router providing user authentication routes
 * @module routers/account
 * @requires express
 * @requires config - app config
 * @requires utils - app utils functions
 * @requires express-validator - form validation module
 * @requires models- app model module
 */
const express = require('express');


 /**
 * express module
 * @const
 */
const router = express.Router();


 /**
 * bycrypt module
 * @const
 */
const bcrypt = require('bcryptjs');


 /**
 * passport module
 * @const
 */
const passport = require('passport');


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
 * JWT module
 * @const
 */
const jwt = require('jsonwebtoken');


 /**
 * Form input validation module
 * @const
 */
const { body, validationResult } = require('express-validator');
const AuditLog = require('../helpers/auditlog.js');
let oldValues = null;
let newValues = null;


const models = require('../models/index.js');
const Users = models.Users;


const sequelize = models.sequelize; // sequelize functions and operations
const Op = models.Op; // sequelize query operators


/**
 * Generate jwt token
 * @param {string} userId - current user id
 * @param {string} expiresIn - token expiration duration
 */
function generateUserToken(user){
	let expiresIn = config.auth.jwtDuration + 'm' //in minutes;
	let userid = user.id;
	let token = jwt.sign({sub: userid}, config.app.secret, { expiresIn });
	return token;
}


/**
 * Get userid from jwt token
 * @param {string} token
 */
function getUserIDFromJwt(token){
	try {
		let decoded = jwt.verify(token, config.app.secret);
		return decoded.sub
	}
	catch (err) {
		throw new Error(err);
	}
}


/**
 * Return user login data
 * @param {object} user - current user
 */
async function getUserLoginData(user){
	// generate a signed jwt for the user
	let token = generateUserToken(user); //generate token duration
	return { user, token }; //return user object and token
}


/**
 * Route to login user using credential
 * @route {POST} /auth/login
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/login', [
		body('username').trim().not().isEmpty(),
		body('password').not().isEmpty(),
	], async (req, res, next) => {
	try{
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let { username, password } = req.body;
		let user = await Users.findOne({where: {[Op.or]: {email: username, username: username}}});
		if(!user){
			return res.unauthorized("Username or password not correct");
		}
		if(!utils.passwordVerify(password, user.password)){
			return res.unauthorized("Username or password not correct");
		}
		AuditLog.writeToLog(req, { recid: user['id'] });
		let loginData = await getUserLoginData(user);
		return res.ok(loginData);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to register new user
 * @route {POST} /auth/register
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/register', 
	[
		body('name').not().isEmpty(),
		body('username').not().isEmpty(),
		body('email').not().isEmpty().isEmail(),
		body('password').not().isEmpty(),
		body('confirm_password', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
		body('telelphone').optional(),
		body('photo').optional(),
	]
, async function (req, res) {
	try{
		// Finds the validation errors in this request and convert to specific format
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let modeldata = req.body;
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.photo !== undefined) {
			let fileInfo = utils.moveUploadedFiles(modeldata.photo, "photo");
			modeldata.photo = fileInfo.filepath;
		}
		modeldata.password = utils.passwordHash(modeldata.password);
		modeldata['user_role_id'] = "8";
		let usernameCount = await Users.count({ where:{ 'username': modeldata.username } });
		if(usernameCount > 0){
			return res.badRequest(`${modeldata.username} already exist.`);
		}
		let emailCount = await Users.count({ where:{ 'email': modeldata.email } });
		if(emailCount > 0){
			return res.badRequest(`${modeldata.email} already exist.`);
		}
		let record = user = await Users.create(modeldata); // user record
		await user.reload();
		let recid =  record['id'];
		newValues = JSON.stringify(record); 
		AuditLog.writeToLog(req, {recid, oldValues, newValues});
		
		let loginData = await getUserLoginData(user);
		return res.ok(loginData);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to send password reset link to user email
 * @route {POST} /auth/forgotpassword
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/forgotpassword', [
		body('email').not().isEmpty().isEmail(),
	], async (req, res) => {
	try{
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let email = req.body.email;
		let user = await Users.findOne({where: { 'email': email} });
		if(!user){
			return res.notFound("Email not registered");
		}
		await sendPasswordResetLink(user);
		AuditLog.writeToLog(req, { recid: user['id'] });
		
		return res.ok("We have emailed your password reset link!");
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to reset user password
 * @route {POST} /auth/resetpassword
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/resetpassword', [
		body('password').not().isEmpty().custom((val, { req, loc, path }) => {
			if (val !== req.body.confirm_password) {
				throw new Error("Passwords confirmation does not match");
			} else {
				return val;
			}
        }),
	],  async (req, res) => {
	try{
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let token = req.body.token;
		let userid = getUserIDFromJwt(token)  //get user id from token payload
		let password = req.body.password;
		let where = {id: userid }
		let record = await Users.findOne({where: where})
		if(!record){
			return res.notFound("User not found");
		}
		var newPassword = bcrypt.hashSync(password, 10);
		var modeldata = {password: newPassword}
		await Users.update(modeldata, {where: where});
		AuditLog.writeToLog(req, { recid: user['id'] });
		
		return res.ok("Password changed");
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Send password reset link to user email 
*/
async function sendPasswordResetLink(user){
	let token = generateUserToken(user);
	let resetlink = `${config.app.frontendUrl}/#/index/resetpassword?token=${token}`;
	let username = user.username;
	let email = user.email;
	let mailtitle = 'Password Reset';
	
	let ejs = require('ejs');
	
	let viewData = { username, email, resetlink, config };
	let mailbody = await ejs.renderFile("views/pages/index/password_reset_email_template.ejs", viewData);
	
	let mailer = require('../helpers/mailer.js');
	let mailResult = await mailer.sendMail(email, mailtitle, mailbody);
	if(!mailResult.messageId){
		throw new Error(mailResult.error);
	}
	return true;
}
module.exports = router;
