var config = {
	app: {
		name: "Consumables",
		url: "http://localhost:8060",
		frontendUrl: "http://localhost:8050",
		secret: "f9f48f92f9dc206cb2956f4e9c6d454e",
		language: "english",
		publicDir: "assets",
	},
	meta: {
		author:"",
		description: "__metadescription",
		charset: "UTF-8",
	},
	auth: {
		jwtDuration: 30, //in minutes
		otpDuration: 5, //in minutes
	},
	database: {
		name:"consumables",
		type: "mysql",
		host: "localhost",
		username: "root",
		password: "astalavista",
		port: "3308",
		charset: "utf8",
		recordlimit: 10,
		ordertype: "DESC"
	},
	mail: {
		username:"",
		password: "",
		senderemail:"",
		sendername:"",
		host: "",
		port: ""
	},
	upload: {
		tempDir: "uploads/temp/",
		import_data: {
			filenameType: "timestamp",
			extensions: "json,csv",
			limit: "10",
			maxFileSize: "3",
			returnFullpath: "false",
			filenamePrefix: "",
			uploadDir: "uploads/files/"
		},
		
	},
	s3: {
		secretAccessKey: "",
		accessKeyId: "",
		region: "",
		bucket: "",
	},
	
}
module.exports = config