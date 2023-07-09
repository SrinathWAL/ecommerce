'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetails.hasMany(models.OrderItems,{foreignKey:{name: "orderId"}})
      OrderDetails.belongsTo(models.User,{foreignKey:{name: "userId"}})
    }
  }
  OrderDetails.init({
    orderDate: DataTypes.DATE,
    totalCost: DataTypes.DOUBLE,
    discountCost: DataTypes.DOUBLE,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'OrderDetails',
  });
  return OrderDetails;
};