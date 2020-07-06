'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Views", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      videoId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Videos',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE(),
      updatedAt: Sequelize.DATE()
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Views")
  }
};