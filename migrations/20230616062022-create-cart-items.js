'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      productId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      cartId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "Cart",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CartItems');
  }
};