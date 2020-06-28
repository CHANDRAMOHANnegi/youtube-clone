'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [
      {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@cm.com',
      password:'12345678',
      
    },
    {
      firstName: 'cm',
      lastName: 'negi',
      email: 'cm@cm.com',
      password:'12345678',
      
    },
    {
      firstName: 'mm',
      lastName: 'rawat',
      email: 'mm@cm.com',
      password:'12345678',
      
    },
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }

};