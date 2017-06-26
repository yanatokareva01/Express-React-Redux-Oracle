var models = require("./../models");
let router = require("express").Router();
let passport = require("passport");
let area = require("./../area");

router.get("/sign_up",
	passport.authenticate("sign_up", {
		failureRedirect: "/"
	}),
	function (req, res) {
		res.redirect("/");
	});

router.get("/sign_in",
	passport.authenticate("sign_in", {
		failureRedirect: "/"
	}),
	function (req, res) {
		res.redirect("/account");
	});

router.post("/sign_in", passport.authenticate("sign_in", function (req, res) {
	// The request will be redirected to vk.com
	// for authentication, so
	// this function will not be called.
}));

router.post("/sign_up", passport.authenticate("sign_up", function (req, res) {
	// The request will be redirected to vk.com
	// for authentication, so
	// this function will not be called.
}));

router.post("/sign_up_local", passport.authenticate("sign_up_local", {
		failureRedirect: "/",
		successRedirect: "/account",
	}
));

router.post("/sign_in_local", passport.authenticate("sign_in_local", {
		failureRedirect: "/",
		successRedirect: "/account",
	}
));

router.get("/sign_out", function(req, res) {
	req.logout();
	res.redirect("/")
});

router.get("/current", function (req, res) {
	if (req.isAuthenticated()) {
		res.send(req.user);
	} else {
		res.send({ ok: false, message: "Not authenticated"})
	}
});

router.get("/:username", ensureAuthenticated, function(req, res) {
	models.User.findOne({
		where: {
			username: req.params.username
		}
	}).then(function (user) {
		res.send(user);
	})
});

router.post("/:username/", ensureAuthenticated, function(req, res) {
	if (req.body.radius) {
		models.User.update({ radius: req.body.radius }, { where: { username: req.params.username }})
			.then(function (ok) {
				models.Point.findAll()
					.then(function (points) {
						for(let point of points) {
							point.updateAttributes({
								result: area.check(point.x, point.y, req.body.radius)
							});
						}
						console.log(points);
						res.send(200);
					});
				res.send(500);
			})
			.catch(function (error) {
				res.send(500);
			})
	} else {
		res.send(500);
	}
});

router.get("/:username/points", ensureAuthenticated, function(req, res) {
	models.User.findOne({
		where: {
			username: req.params.username
		}
	}).then(function (user) {
		user.getPoints().then(function (points) {
			res.send(points);
		})
	})
});

router.post("/:username/points", ensureAuthenticated, function(req, res) {
	let result = area.check(req.body.x, req.body.y, req.user.radius);
	let point = models.Point.create({x: req.body.x, y: req.body.y, result: result, UserId: req.user.id });
	res.sendStatus(200);
});

module.exports = router;

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated() && req.user.username == req.params.username) {
		return next();
	}
	res.redirect("/")
}