module.exports = function (app) {
	let models = require('../models');
	let passport = require('passport');
	let VkStrategy  = require('passport-vkontakte').Strategy;
	let LocalStrategy = require('passport-local').Strategy;

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function(user, done) {
		done(null, user.username);
	});

	passport.deserializeUser(function(username, done) {
		models.User.findOne({
			where: {
				username: username
			}
		}).then(function (user) {
			if (user) {
				done(null, user.get());
			} else {
				done(user.errors, null);
			}
		})
	});

	passport.use('sign_in', new VkStrategy(
		{
			clientID: process.env.VK_APP_ID,
			clientSecret: process.env.VK_APP_SECRET,
			callbackURL: "http://localhost:3000/users/sign_in",
		},
		function verify(accessToken, refreshToken, params, profile, done) {
			models.User.findOne({
				where: {
					username: profile.username
				}
			}).then(function (user) {
				if (user) {
					done(null, user);
				} else {
					return done(null, false, { message: 'No such user' });
				}
			});
		}
	));

	passport.use('sign_up', new VkStrategy(
		{
			clientID: process.env.VK_APP_ID,
			clientSecret: process.env.VK_APP_SECRET,
			callbackURL: "http://localhost:3000/users/sign_up",
			profileFields: ['photo_100', 'bdate', 'about', 'activities']
		},
		function verify(accessToken, refreshToken, params, profile, done) {
			models.User.findOne({
				where: {
					username: profile.username
				}
			}).then(function (user) {
				if (user) {
					return done(null, false, {message: "User already exists"});
				} else {
					models.User.create({
						username: profile.username,
						name: profile.displayName,
						photo: profile._json.photo_100,
						about: profile._json.about,
						activities: profile._json.activities
					}).then(user => {
						if (user) {
							done(null, user);
						} else {
							return done(null, false, { message: 'Can\'t create user' });
						}
					});
				}
			});
		}
	));

	passport.use('sign_up_local', new LocalStrategy(
		{
			passReqToCallback: true
		},
		function(req, username, password, done) {
			models.User.findOne({
				where: {
					username: username
				}
			}).then(function (user) {
				if (user) {
					return done(null, false, {message: "User already exists"});
				} else {
					models.User.create({
						username: username,
						password: models.User.generateHash(password),
						name: req.body.name,
						about: req.body.about,
						activities: req.body.activities,
						photo: "https://vk.com/images/camera_100.png"
					}).then(user => {
						if (user) {
							done(null, user);
						} else {
							return done(null, false, { message: 'Can\'t create user' });
						}
					});
				}
			})
		}
	));

	passport.use('sign_in_local', new LocalStrategy(
		{
			passReqToCallback: true
		},
		function(req, username, password, done) {
			models.User.findOne({
				where: {
					username: username,
				}
			}).then(function (user) {
				if (user && models.User.isPasswordValid(password, user.password)) {
					done(null, user);
				} else {
					return done(null, false, { message: 'Invalid username or password' });
				}
			})
		}
	))
};
