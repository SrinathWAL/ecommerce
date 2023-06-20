'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now=new Date()
     await queryInterface.bulkInsert('Category', [{
        name: 'Electronics',
        description: 'Electrical Equipment,Wires,Bulbs,Plugs,Others',
        createdAt: now,
        updatedAt: now,
      },{
        name: 'Books',
        description: 'Books,Comics,Magazines,paperback',
        createdAt: now,
        updatedAt: now
      },{
        name: 'Mobiles',
        description: 'Smartphones,Usb cables,chargers,Earphones,Earpods',
        createdAt: now,
        updatedAt: now
      },{
        name: 'Fashion',
        description: 'Jeans,Shirts,T-Shirts,Tracks,Shorts,Boxers',
        createdAt: now,
        updatedAt: now
      }], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Category',null, {});
}};
