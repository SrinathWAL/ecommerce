'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Category', [{
        name: 'Electronics',
        description: 'Electrical Equipment,Wires,Bulbs,Plugs,Others'
      },{
        name: 'Books',
        description: 'Books,Comics,Magazines,paperback'
      },{
        name: 'Mobiles',
        description: 'Smartphones,Usb cables,chargers,Earphones,Earpods'
      },{
        name: 'Fashion',
        description: 'Jeans,Shirts,T-Shirts,Tracks,Shorts,Boxers'
      }], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Category',null, {});
}};
