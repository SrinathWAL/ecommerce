'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Inventory,{foreignKey:{name:"inventoryId"}})
      Product.belongsTo(models.Discount,{foreignKey:{name:"discountId"}})
      Product.hasOne(models.CartItems,{foreignKey:{name:"productId"}})
      Product.belongsTo(models.Category,{foreignKey:{name:"categoryId"}})
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    description: DataTypes.TEXT,
    discountStatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};