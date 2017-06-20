module.exports = function(sequelize, DataTypes) {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			notNull: true
		},
		password: {
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
			notNull: true
		},
		photo: {
			type: DataTypes.STRING
		},
		about: {
			type: DataTypes.STRING
		},
		activities: {
			type: DataTypes.STRING
		}
	}, {
		classMethods: {
			associate: (models) => {
				User.hasMany(models.Point, {
					as: 'points',
				});
			},
		},
	});

	return User;
};