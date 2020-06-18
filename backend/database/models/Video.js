module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define('Video', {
        
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
          },
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
        Video.belongsTo(models.User, 
            {
            as: 'User',
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        }
        );
    };
    return Video;
}