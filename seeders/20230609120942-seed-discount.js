'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Discount', [{
        name: 'WelcomeBack',
        discountPercent: '0.2',
      },{
        name: 'FirstBuy',
        discountPercent: '0.3',
      },{
        name: 'Get50Off',
        discountPercent: '0.5',
      },{
        name: 'Get40Off',
        discountPercent: '0.4',
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Discount',null, {});
  }
};
