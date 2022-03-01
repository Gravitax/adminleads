module.exports = (Sequelize, sequelize) => {
	return (
		sequelize.define("Dispositif", {
			id	: {
				type			: Sequelize.INTEGER,
				autoIncrement	: true,
				allowNull		: false,
				primaryKey		: true
			},
			nom	: {
				type			: Sequelize.STRING,
				allowNull		: false
			}
		}, {
			tableName	: "dispositifs"
		})
	);
};
