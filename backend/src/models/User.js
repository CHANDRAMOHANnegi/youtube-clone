const Sequelize = require('sequelize');
const sequelize = require('../database/connecton');

module.exports = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(20),
        maxlength: 50,
        allowNull: false,
    }, lastname: {
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
    image: Sequelize.STRING(20),
    // token: {
    //     type: Sequelize.STRING(),
    // },
    // tokenExp: {
    //     type: Sequelize.INTEGER(),
    // }
}, {
    timestamps: true,
    freezeTableName: true,
});