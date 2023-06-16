'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Inventory', [{
        quantity: '50',
      },{
        quantity: '100',
      },{
        quantity: '25',
      },{
        quantity: '75',
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Inventory',null, {});
  }
};
