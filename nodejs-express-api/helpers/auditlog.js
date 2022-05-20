
	const models = require('../models/index.js');
	const utils = require('../helpers/utils.js');
	module.exports = {
		async writeToLog (req, payload) {
			try{
				let timeStamp = new Date();
				let page = req.baseUrl.trimLeft("/");
				let action = req.path.trimLeft("/").split("/")[0] || "list";
				
				let reqId = req.params.recid || ""; // get rec id from url if available
				let recId = payload.recid || reqId;

				recId = recId.toString(); //if array, convert to string

				let userId = recId;
				if(req.user){
					userId = req.user.id || null;
				}

				let oldValues = payload.oldValues || null;
				let newValues = payload.newValues || null;

				let userIp = req.ip;
				let userAgent = req.get('User-Agent');;
				let requestUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
				let  fields = {
					'action': action,
					'page': page,
					'record_id': recId,
					'old_values': oldValues,
					'new_values': newValues,
					'user_id': userId,
					'user_ip': userIp,
					'user_agent': userAgent,
					'request_url': requestUrl,
					'timestamp': timeStamp
				}
				return await models.Audits.create(fields);
			}
			catch(err){
				console.log(err)
			}
		}
	}
