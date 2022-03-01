module.exports = (Sequelize, sequelize) => {
	return (
		sequelize.define("Flux", {
			id			: {
				type			: Sequelize.INTEGER,
				autoIncrement	: true,
				allowNull		: false,
				primaryKey		: true
			},
			nom			: {
				type			: Sequelize.STRING,
				allowNull		: false
			},
			editLead	: {
				type			: Sequelize.INTEGER,
				allowNull		: false
			}
		}, {
			tableName	: "flux"
		})
	);
};
