'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User,{foreignKey:{name:"userId"}})
      Cart.hasMany(models.CartItems,{foreignKey:{name:"cartId"}})
    }
  }
  Cart.init({
    totalCost: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Cart',
    createdAt:false,
    updatedAt:false,
    freezeTableName:true
  });
  return Cart;
};