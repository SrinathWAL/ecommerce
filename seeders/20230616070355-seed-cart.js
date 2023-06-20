'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now=new Date()
    await queryInterface.bulkInsert('Cart', [{
      totalCost: '0',
      userId: '1',
      createdAt: now,
      updatedAt: now,
    },{
      totalCost: '0',
      userId: '2',
      createdAt: now,
      updatedAt: now,
    },{
      totalCost: '0',
      userId: '3',
      createdAt: now,
      updatedAt: now,
    },{
      totalCost: '0',
      userId: '4',
      createdAt: now,
      updatedAt: now,
    },{
      totalCost: '0',
      userId: '5',
      createdAt: now,
      updatedAt: now,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cart', null, {});
  }
};
