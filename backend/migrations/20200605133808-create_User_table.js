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
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      }, role: {
        type: Sequelize.INTEGER(20),
        defaultValue: 0,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING(20),
      },
      // token: Sequelize.STRING(1110),
      // tokenExp: {
      //   type: Sequelize.INTEGER(),
      // },
      image: Sequelize.STRING(20),
      createdAt: Sequelize.DATE(),
      updatedAt: Sequelize.DATE()
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("User")
  }
};