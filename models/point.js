module.exports = function(sequelize, DataTypes) {
	const Point =  sequelize.define('Point', {
		x: {
			type: DataTypes.DOUBLE,
			notNull: true
		},
		y: {
			type: DataTypes.DOUBLE,
			notNull: true
		},
		result: {
			type: DataTypes.BOOLEAN,
		},
	}, {
		classMethods: {
			associate: (models) => {
				Point.belongsTo(models.User, {
					onDelete: 'CASCADE',
				});
			},
		},
	});

	return Point;
};