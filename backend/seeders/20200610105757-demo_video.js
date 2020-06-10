'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Video', [{
      title: 'John',
      description: 'Doe',
      url: 'cm@cm.com',
      category: '12345678',
      views: '12345678',
      thumbnail: '12345678',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Video', null, {});
  }

};