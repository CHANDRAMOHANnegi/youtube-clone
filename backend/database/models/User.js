

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
          },
        firstname: {
            type: Sequelize.STRING(20),
            maxlength: 50,
            allowNull: false,
        },
        lastname: {
            type: Sequelize.STRING(20),
        },
        email: {
            type: Sequelize.STRING(30),
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING(200),

        },
        role: {
            type: Sequelize.INTEGER(11),
            default: 0
        },
        image: Sequelize.STRING(200),
    }, {
        timestamps: true,
        freezeTableName: true,
    });

    User.associate = (models) => {
        User.hasMany(models.Video, 
            {
            as: 'Video',
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        }
        );
    };

    return User;
};