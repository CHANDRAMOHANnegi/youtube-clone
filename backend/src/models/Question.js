const Sequelize = require('sequelize');

const sequelize = require('../database/connecton');

module.exports = sequelize.define('Question',
    {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userId: Sequelize.INTEGER(11),
        content: Sequelize.STRING(300)
    }, {
    timestamps: true,
    freezeTableName: true,
}
);