module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define('Video', {

        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        title: {
            type: Sequelize.STRING,
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
            type: Sequelize.STRING,
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
    },
        {
            timestamps: true,
            // freezeTableName: true,
            // classMethods: {
            // associate: (models) => {
            //     Video.belongsTo(models.User, {
            //         foreignKey: 'userId',
            //         onDelete: 'CASCADE'
            //     });
            // }
            // }
        });

    Video.associate =  function (models) {
        Video.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    }
    return Video;
}