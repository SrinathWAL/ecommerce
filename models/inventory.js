'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inventory.hasOne(models.Product,{foreignKey:{name:"inventoryId"}})
    }
  }
  Inventory.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventory',
    createdAt:false,
    updatedAt:false,
    freezeTableName:true
  });
  return Inventory;
};