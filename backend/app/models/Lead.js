module.exports = (Sequelize, sequelize) => {
	return (
		sequelize.define("Lead", {
			id : {
				type			: Sequelize.INTEGER,
				autoIncrement	: true,
				allowNull		: false,
				primaryKey		: true
			},
			timestamp : {
				type			: Sequelize.DATE,
			},
			clients : {
				type			: Sequelize.INTEGER,
			},
			ucci : {
				type			: Sequelize.STRING,
			},
			programme : {
				type			: Sequelize.STRING,
			},
			media : {
				type			: Sequelize.INTEGER,
			},
			civilite : {
				type			: Sequelize.STRING,
			},
			nom : {
				type			: Sequelize.STRING,
			},
			prenom : {
				type			: Sequelize.STRING,
			},
			email : {
				type			: Sequelize.STRING,
			},
			codepostal : {
				type			: Sequelize.STRING,
			},
			ville : {
				type			: Sequelize.STRING,
			},
			codepostalInvest : {
				type			: Sequelize.STRING,
			},
			villeInvest : {
				type			: Sequelize.STRING,
			},
			telephone : {
				type			: Sequelize.STRING,
			},
			useragent : {
				type			: Sequelize.STRING,
			},
			webtag : {
				type			: Sequelize.STRING,
			},
			webtagcc : {
				type			: Sequelize.STRING,
			},
			projet : {
				type			: Sequelize.STRING,
			},
			optin : {
				type			: Sequelize.INTEGER,
			},
			doublon : {
				type			: Sequelize.INTEGER,
			},
			accepte : {
				type			: Sequelize.INTEGER,
			},
			commentaire : {
				type			: Sequelize.STRING,
			},
			commentaire_lead : {
				type			: Sequelize.STRING,
			},
			landing : {
				type			: Sequelize.STRING,
			}
		}, {
			tableName	: "leads"
		})
	);
};
