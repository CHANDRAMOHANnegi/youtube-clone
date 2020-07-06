

'use strict';
module.exports = function (sequelize, Sequelize) {

    const View = sequelize.define('View', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        }
    }, {
        timestamps: true,
        //  freezeTableName: true
    })

    View.associate = function (models) {
       //user  can  like  video or comment
       View.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'writer',
        onDelete: 'CASCADE'
    });

    //user can  like  video once
    View.belongsTo(models.Video, {
        foreignKey: 'videoId',
        onDelete: 'CASCADE'
    });
    };

    return View;
};