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
      Product.belongsTo(models.Category, {
        foreignKey: {
          name: "categoryId",
        },
      });
      Product.belongsTo(models.Discount, {
        foreignKey: {
          name: "discountId",
        },
      });
      Product.belongsTo(models.Inventory, {
        foreignKey: {
          name: 'inventoryId',
        },
      });
      Product.hasMany(models.cartItems,
        {foreignKey:
          {name: "productId"
        }
      });  
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};