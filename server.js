let express = require('express');
let configurePassport = require('./config/passport');
let users = require('./routes/users');
let bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(express.static('build'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(require('express-session')({ secret: 'keyboard cat' }));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

configurePassport(app);

app.use('/users', users);

app.get('/', function (req, res) {
	if (req.isAuthenticated()) {
		res.redirect('/account');
	}

	res.sendfile('public/main.html');
});

app.get('/account', ensureAuthenticated, function (req, res) {
	res.sendfile('public/account.html');
});

app.get('*', function (req, res) {
	if (req.isAuthenticated()) {
		res.redirect('/account');
	}

	res.sendfile('public/main.html');
});

app.listen(process.env.PORT || 3000);

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/')
}