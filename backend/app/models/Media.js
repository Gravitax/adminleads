module.exports = (Sequelize, sequelize) => {
	return (
		sequelize.define("Media", {
			id		: {
				type			: Sequelize.INTEGER,
				autoIncrement	: true,
				allowNull		: false,
				primaryKey		: true
			},
			name	: {
				type			: Sequelize.STRING,
				allowNull		: false
			}
		}, {
			tableName	: "medias"
		})
	);
};
