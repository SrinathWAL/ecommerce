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
      Cart.hasMany(models.cartItems,{foreignKey:{name:"cartId"}})
    }
  }
  Cart.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    cost: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Cart',
    freezeTableName:true
  });
  return Cart;
};