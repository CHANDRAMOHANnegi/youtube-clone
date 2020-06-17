'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Video", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
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
        type: Sequelize.STRING,
        maxlength: 50,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      filePath: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
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
      createdAt: Sequelize.DATE(),
      updatedAt: Sequelize.DATE()
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Video")
  }
};