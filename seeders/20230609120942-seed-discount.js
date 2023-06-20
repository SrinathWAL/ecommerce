'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()
     await queryInterface.bulkInsert('Discount', [{
        name: 'WelcomeBack',
        discountPercent: '0.2',
        createdAt: now,
        updatedAt: now,
      },{
        name: 'FirstBuy',
        discountPercent: '0.3',
        createdAt: now,
        updatedAt: now,
      },{
        name: 'Get50Off',
        discountPercent: '0.5',
        createdAt: now,
        updatedAt: now,
      },{
        name: 'Get40Off',
        discountPercent: '0.4',
        createdAt: now,
        updatedAt: now,
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Discount',null, {});
  }
};
