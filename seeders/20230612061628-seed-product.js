'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()
    await queryInterface.bulkInsert('Products', [
      {
      name: 'Iphone14Pro',
      description: '8gb-RAM,256gb-SSD Solid-Black',
      price: 149000,
      categoryId: 3,
      inventoryId: 1,
      discountId:1,
      createdAt: now,
      updatedAt: now,
      discountStatus: 'true'
      },{
      name: 'Harry-Potter',
      description: 'Magical adventures of a young wizard,Paperback',
      price: 399,
      categoryId: 2,
      inventoryId: 2,
      discountId:2,
      createdAt: now,
      updatedAt: now,
      discountStatus: 'false'
      },{
      name: 'Denim-Jogger',
      description: 'Casual and stylish hybrid pants',
      price: 799,
      categoryId: 4,
      inventoryId: 3,
      discountId:3,
      createdAt: now,
      updatedAt: now,
      discountStatus: 'true'
      },{
      name: 'Nixon5sG5',
      description: 'Unleash your creative vision with Nixon',
      price: 38299,
      categoryId: 1,
      inventoryId: 4,
      discountId: 4,
      createdAt: now,
      updatedAt: now,
      discountStatus: 'true'
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products',null, {});
  }
};
