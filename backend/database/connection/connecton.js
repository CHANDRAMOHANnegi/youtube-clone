const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'youtubedb',
    'root',
    'dhampoo1@',
    {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const user = require('../models/User')(sequelize, Sequelize);
const video = require('../models/Video')(sequelize, Sequelize);

db.user = user;
db.video = video;
module.exports = db;

