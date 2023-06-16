'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Categories', [{
        name: 'Electronics',
        description: 'Electrical Equipment,Wires,Bulbs,Plugs,Others',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },{
        name: 'Books',
        description: 'Books,Comics,Magazines,paperback',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },{
        name: 'Mobiles',
        description: 'Smartphones,Usb cables,chargers,Earphones,Earpods',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },{
        name: 'Fashion',
        description: 'Jeans,Shirts,T-Shirts,Tracks,Shorts,Boxers',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories',null, {});
}};
