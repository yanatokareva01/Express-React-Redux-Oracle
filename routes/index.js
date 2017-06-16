module.exports = function (app) {
	app.get('/', function (req, res) {
		res.sendfile(__dirname + 'public/index.html');
	});

	let users = require('./users');

	app.use('/users', users);
};