module.exports = (Sequelize, sequelize, Service, Media) => {
	return (
		sequelize.define("MediaService", {
			serviceId	: {
				type		: Sequelize.INTEGER,
				references	: {
					model		: Service,
					key			: "id"
				}
			},
			mediaId		: {
				type		: Sequelize.INTEGER,
				references	: {
					model		: Media,
					key			: "id"
				}
			},
		}, {
			tableName	: "media_services"
		})
	);
};
