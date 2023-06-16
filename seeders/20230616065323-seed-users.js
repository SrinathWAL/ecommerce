'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      username: 'Rajiv',
      email: 'rajiv@gmail.com',
      password: 'rajiv'
    },{
      username: 'Rohan',
      email: 'rohan@gmail.com',
      password: 'rohan'
    },{
      username: 'Maneesh',
      email: 'maneesh@gmail.com',
      password: 'maneesh'
    },{
      username: 'Smriti',
      email: 'smriti@gmail.com',
      password: 'smriti'
    },{
      username: 'Sudha',
      email: 'sudha@gmail.com',
      password: 'sudha'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
     
  }
};
