'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Discounts', [{
        name: 'WelcomeBack',
        description: 'user orders after a long gap',
        discountPercent: '0.2',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },{
        name: 'FirstBuy',
        description: 'users 1st Order',
        discountPercent: '0.3',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },{
        name: 'Get50Off',
        description: 'users recieve 50% off on products above 1099/-',
        discountPercent: '0.5',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Discounts',null, {});
  }
};
