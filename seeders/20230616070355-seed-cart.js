'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cart', [{
      totalCost: '0',
      userId: '1',
    },{
      totalCost: '0',
      userId: '2',
    },{
      totalCost: '0',
      userId: '3',
    },{
      totalCost: '0',
      userId: '4',
    },{
      totalCost: '0',
      userId: '5',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cart', null, {});
  }
};
