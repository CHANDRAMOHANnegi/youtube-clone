'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Video", {
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
      createdAt: Sequelize.DATE(),
      updatedAt: Sequelize.DATE()
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Video")
  }
};