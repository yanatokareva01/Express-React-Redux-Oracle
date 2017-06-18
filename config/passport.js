module.exports = function (app) {
	let models = require('../models');
	let passport = require('passport');
	let VkStrategy  = require('passport-vkontakte').Strategy;

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
		},
		function verify(accessToken, refreshToken, params, profile, done) {
			models.User.findOne({
				where: {
					username: profile.username
				}
			}).then(function (user) {
				if (user) {
					console.log('User already exists');
					return done(null, false, {message: "User already exists"});
				} else {
					models.User.create({
						username: profile.username,
						name: profile.name.givenName + ' ' + profile.name.familyName
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
}
