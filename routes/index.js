let express = require('express');
let router  = express.Router();

router.get('/', function (req, res) {
	res.sendfile(__dirname + 'public/index.html');
});