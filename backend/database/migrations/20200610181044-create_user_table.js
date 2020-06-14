'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("User", {
      id: {
        type: Sequelize.INTEGER(121),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      firstname: {
        type: Sequelize.STRING(20),
        allowNull: false,
      }, 
      role: {
        type: Sequelize.INTEGER(20),
        defaultValue: 0,
       },
      email: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING(20),
      },
      image: Sequelize.STRING(20),
      createdAt: Sequelize.DATE(),
      updatedAt: Sequelize.DATE()
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("User")
  }
};