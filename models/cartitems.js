'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItems.belongsTo(models.Product,{foreignKey:{name:"productId"}})
    }
  }
  CartItems.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItems',
    createdAt:false,
    updatedAt:false,
    freezeTableName:true
  });
  return CartItems;
};