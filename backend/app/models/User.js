module.exports = (Sequelize, sequelize) => {
	return (
		sequelize.define("User", {
			id			: {
				type			: Sequelize.INTEGER,
				autoIncrement	: true,
				allowNull		: false,
				primaryKey		: true
			},
			email		: {
				type			: Sequelize.STRING,
				allowNull		: false
			},
			password	: {
				type			: Sequelize.STRING,
				allowNull		: false
			},
			role		: {
				type			: Sequelize.INTEGER,
				defaultValue	: 0
			}
		}, {
			tableName	: "users"
		})
	);
};
