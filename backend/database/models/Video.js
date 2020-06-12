 module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define('Video', {
        title: {
            type: Sequelize.STRING(20),
            maxlength: 50,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
        },
        url: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        category: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        views: {
            type: Sequelize.INTEGER,
            default: 0
        },
        thumbnail: Sequelize.TEXT,
    }, {
        timestamps: true,
        freezeTableName: true,
    });
    Video.associate = (models) => {
        Video.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        });
    };
    return Video;
}