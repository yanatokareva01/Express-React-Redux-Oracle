let express = require('express');
let configurePassport = require('./config/passport');
let users = require('./routes/users');

const app = express();
app.use(express.static('public'));
app.use(express.static('build'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(require('express-session')({ secret: 'keyboard cat' }));

configurePassport(app);

app.use('/users', users);

app.get('/', function (req, res) {
	res.sendfile('public/index.html');
});

app.get('/account', ensureAuthenticated, function (req, res) {
	res.sendfile('public/account.html');
});

app.get('*', function (req, res) {
	res.sendfile('public/index.html');
});

app.listen(process.env.PORT || 3000);

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/')
}