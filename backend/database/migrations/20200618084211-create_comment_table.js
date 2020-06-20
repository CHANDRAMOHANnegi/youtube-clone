'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Comment", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
     
      postId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Videos',
          key: 'id'
        }
      }, 
       userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
   
      content: {
        type: Sequelize.TEXT,
      },
      
      createdAt: Sequelize.DATE(),
      updatedAt: Sequelize.DATE()
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Comment")
  }
};