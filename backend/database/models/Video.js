module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define('Video', {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
             references: {
              model: 'User',
              key: 'id'
            }
          },
        title: {
            type: Sequelize.STRING(20),
            maxlength: 50,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
        },
        filePath: {
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
        privacy: {
            type: Sequelize.INTEGER,
            default: 0
        },
        thumbnail: Sequelize.TEXT,
    }, {
        timestamps: true,
        freezeTableName: true,
    });
    Video.associate = (models) => {
        Video.hasOne(models.User, {
            as: 'user',
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return Video;
}