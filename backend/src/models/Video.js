const Sequelize = require('sequelize');
const sequelize = require('../database/connecton');

module.exports = sequelize.define('video', {
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