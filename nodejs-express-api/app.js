/** Express Server App
 * @module server/app
 * @requires express
 * @requires config - app configigurations
 * @requires path- path module
 * @requires cors- Enable cors for all routes
 * @requires auth/passport passport auth using JWTStrategy
 * @requires helpers/response Http Response Status Code
 */


const express = require('express');
const path = require('path');
const config = require('./config.js');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.static(config.app.publicDir));
const passport = require('passport');
require('./helpers/passport-auth')(passport);
app.use(express.json()) // Parses json, multi-part (file), url-encoded
app.use(express.urlencoded({extended:true, limit:'50mb'}));

//set view engine use to return Html
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
require('./helpers/response')(app);

//login user and pass user to req.user object
app.use('/api',
	async (req, res, next) => {
		passport.authenticate('jwt', async (err, user, info) => {
			req.login(user, { session: false }, async (error) => {});
			return next();
		}
		)(req, res, next);
	}
);

//bind page route to the controllers
app.use('/api/home', require('./controllers/home.js'));
app.use('/api/components_data', require('./controllers/components_data.js'));
app.use('/api/fileuploader', require('./controllers/fileuploader.js'));
app.use('/api/s3uploader', require('./controllers/s3uploader.js'));
app.use('/api/auth', require('./controllers/auth.js'));

//protect all /api endpoints
app.use('/api', async (req, res, next) => {
	if(req.user){
		return next();//user is authenticated
	}
	return res.unauthorized();
});


const Rbac = require('./helpers/rbac.js');
app.use('/api', async (req, res, next) => {
	try{
		let rbac = new Rbac(req.user.user_role_id);
		await rbac.getUserPages();
		let pageAccess = rbac.getPageAccess(req.path);
		if (pageAccess == rbac.AUTHORIZED) {
			let userRoleNames = await rbac.getRoleNames(); //get default role name
			if(userRoleNames.length){
				req.user.roleName = userRoleNames[0].toLowerCase();
			}
			return next();
		}
		else if(pageAccess == rbac.FORBIDDEN){
			return res.forbidden();
		}
		else if(pageAccess == rbac.UNKNOWN_ROLE){
			return res.forbidden("Unknown Role");
		}
	}
	catch(err){
		return res.serverError();
	}
});
app.use('/api/account', require('./controllers/account.js'));
app.use('/api/action_types', require('./controllers/action_types.js'))
app.use('/api/audits', require('./controllers/audits.js'))
app.use('/api/departments', require('./controllers/departments.js'))
app.use('/api/items', require('./controllers/items.js'))
app.use('/api/measurements', require('./controllers/measurements.js'))
app.use('/api/permissions', require('./controllers/permissions.js'))
app.use('/api/roles', require('./controllers/roles.js'))
app.use('/api/stocks', require('./controllers/stocks.js'))
app.use('/api/types', require('./controllers/types.js'))
app.use('/api/users', require('./controllers/users.js'))
app.get('*', function(req, res){
    res.status(404).json("Page not found");
});

let port = 8060;
//start app
app.listen(port, () => {
    console.log('Server is up and running on port: ' + port);
});