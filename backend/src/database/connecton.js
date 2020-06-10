const Sequelize = require('sequelize');


const user = require('../models/User');
const video = require('../models/Video');


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

user.hasMany(video, { foreignKey: "userId", as: "videos" });
video.belongsTo(user, { foreignKey: "userId", as: "user", });

db.user = user;
db.video = video;
module.exports = db;

