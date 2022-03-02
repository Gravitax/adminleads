module.exports = (Sequelize, sequelize) => {
	return (
		sequelize.define("Client", {
			id		: {
				type			: Sequelize.INTEGER,
				autoIncrement	: true,
				allowNull		: false,
				primaryKey		: true
			},
			name	: {
				type			: Sequelize.STRING,
				allowNull		: false
			},
		}, {
			tableName	: "clients"
		})
	);
};
