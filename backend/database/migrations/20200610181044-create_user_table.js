'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("User", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      role: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
       },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      image: Sequelize.STRING,
      createdAt: Sequelize.DATE(),
      updatedAt: Sequelize.DATE()
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("User")
  }
};