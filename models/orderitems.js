'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItems.belongsTo(models.OrderDetails,{foreignKey:{name :"orderId"}})
      OrderItems.belongsTo(models.Product,{foreignKey:{name: "productId"}})
    }
  }
  OrderItems.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItems',
  });
  return OrderItems;
};