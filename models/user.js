module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			notNull: true,
			unique: true
		},
		name: {
			type: DataTypes.STRING,
			notNull: true
		}
	});
};