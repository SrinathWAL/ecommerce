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
      Inventory.hasOne(models.Product,{foreignKey:{name: "inventoryId",}});
    }
  }
  Inventory.init({
    quantity: DataTypes.INTEGER,
    availability: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Inventory',
    freezeTableName:true
  });
  return Inventory;
};