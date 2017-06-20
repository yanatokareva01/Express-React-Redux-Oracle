let Sequelize = require('sequelize-oracle');
let path = require('path');
let env = process.env.NODE_ENV || "development";
let fs = require('fs');
let config = require(path.join(__dirname, '../config/sequelize.json'))[env];
let sequelize = new Sequelize(config.database, config.username, config.password, config);

let db = {};

fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf(".") !== 0) && (file !== "index.js");
	})
	.forEach(function(file) {
		let model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName) {
	if ("associate" in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

let bcrypt = require('bcrypt-nodejs');
db.User.hasMany( db.Point, { as: 'points' } );

db.User.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

db.User.isPasswordValid = function (password, hash) {
	return bcrypt.compareSync(password, hash);
};

//sequelize.sync({ force: true }).then(function () {
//	console.log("ok");
//});

module.exports = db;