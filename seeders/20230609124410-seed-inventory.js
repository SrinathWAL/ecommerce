'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now=new Date()
     await queryInterface.bulkInsert('Inventory', [{
        quantity: '50',
        createdAt: now,
        updatedAt: now,
      },{
        quantity: '100',
        createdAt: now,
        updatedAt: now,
      },{
        quantity: '25',
        createdAt: now,
        updatedAt: now,
      },{
        quantity: '75',
        createdAt: now,
        updatedAt: now,
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Inventory',null, {});
  }
};
