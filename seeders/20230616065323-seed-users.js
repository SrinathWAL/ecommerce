'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now=new Date()
    await queryInterface.bulkInsert('Users', [{
      username: 'Rajiv',
      email: 'rajiv@gmail.com',
      password: 'rajiv',
      address: 'Flat-103,Lake Ridge,Nizampet,Hyderabad-500051',
      createdAt: now,
      updatedAt: now,
    },{
      username: 'Rohan',
      email: 'rohan@gmail.com',
      password: 'rohan',
      address: 'Flat-302,Park View,Suchitra,Hyderabad-500063',
      createdAt: now,
      updatedAt: now,
    },{
      username: 'Maneesh',
      email: 'maneesh@gmail.com',
      password: 'maneesh',
      address: 'DNO-6/24,Nizam Road,Alwal,Hyderabad-500060',
      createdAt: now,
      updatedAt: now,
    },{
      username: 'Smriti',
      email: 'smriti@gmail.com',
      password: 'smriti',
      address: 'DN-3/2/251,Loyala Colony,Kompally,Hyderabad-500064',
      createdAt: now,
      updatedAt: now,
    },{
      username: 'Sudha',
      email: 'sudha@gmail.com',
      password: 'sudha',
      address : 'FNO-201,Amulya Heights,ECIL,Hyderabad-500071',
      createdAt: now,
      updatedAt: now,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
     
  }
};
