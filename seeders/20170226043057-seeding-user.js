'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    // var faker = require('faker')
    // let newArr = []
    // for(let i = 0; i<=10; i++) {
    //   newArr.push({fullname: faker.name.findName(), username: faker.internet.userName(), password: faker.internet.password(), email: faker.internet.email(), createdAt: new Date(), updatedAt: new Date()})
    // }
    // return queryInterface.bulkInsert('Users', newArr)
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
