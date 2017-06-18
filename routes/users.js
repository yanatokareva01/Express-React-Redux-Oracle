var models = require('./../models');
let router = require('express').Router();
let passport = require('passport');

router.get('/sign_up',
	passport.authenticate('sign_up', {
		failureRedirect: '/'
	}),
	function (req, res) {
		res.redirect('/');
	});

router.get('/sign_in',
	passport.authenticate('sign_in', {
		failureRedirect: '/'
	}),
	function (req, res) {
		res.redirect('/account');
	});

router.post("/sign_in", passport.authenticate('sign_in', function (req, res) {
	// The request will be redirected to vk.com
	// for authentication, so
	// this function will not be called.
}));

router.post("/sign_up", passport.authenticate('sign_up', function (req, res) {
	// The request will be redirected to vk.com
	// for authentication, so
	// this function will not be called.
}));

router.get("/current", function (req, res) {
	if (req.isAuthenticated()) {
		res.send(req.user);
	} else {
		res.send({ ok: false, message: "Not authenticated"})
	}
});

router.get("/:username", function(req, res) {
	models.User.findOne({
		where: {
			username: req.params.username
		}
	}).then(function (user) {
		res.send(user);
	})
});

module.exports = router;