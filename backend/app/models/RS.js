module.exports = (Sequelize, sequelize) => {
	return (
		sequelize.define("RS", {
			RSId	: {
				type			: Sequelize.INTEGER,
				autoIncrement	: true,
				allowNull		: false,
				primaryKey		: true
			}
		}, {
			tableName	: "rs"
		})
	);
};
 