const Sequelize = require('sequelize');
const sequelize = require('../connection/connecton');

module.exports = sequelize.define('user', {

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
    }, password: {
        type: Sequelize.STRING(200),
        allowNull: false,
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