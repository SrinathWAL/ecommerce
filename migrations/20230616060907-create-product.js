'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      description:{
        type: Sequelize.TEXT,
        allowNull:false
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull:false
      },
      categoryId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      inventoryId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "Inventory",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      discountId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "Discounts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};