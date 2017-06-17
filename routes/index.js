module.exports = function (app) {
	let users = require('./users');

	app.get('/', function (req, res) {
		res.sendfile('index.html');
	});

	app.get('/account', ensureAuthenticated, function (req, res, next) {
		res.sendfile('public/account.html');
	});
	app.use('/users', users);

	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/')
	}
};