const Sequelize = require('sequelize');

module.exports = new Sequelize(
    'youtubedb',
    'root',
    'dhampoo1@',
    {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false
    }
);
 
