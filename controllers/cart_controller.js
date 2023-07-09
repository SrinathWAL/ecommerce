//import required packages
const expressAsyncHandler = require("express-async-handler");
//dotenv file import
require("dotenv").config();
const db = require("../models/index");

//Retrieve the contents of the cart
const viewCartItems = expressAsyncHandler(async (req, res) => {
  let item = await db.CartItems.findAll({ include: [{model:db.Product,include:["Discount"]}] });
  //If there are no items then display that cart is empty.
  if (item.length == 0) {
    res.status(200).send({ message: "No items in the cart!" });
  } else {
    //Contents of the cart with the product details
    res
      .status(200)
      .send({ message: "Cart items fetched Successfully: ", item });
  }
});

//Add an item to the shopping cart
const addToCart = expressAsyncHandler(async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    //Cart of the specific user is is taken through parameter
    let shcart = await db.User.findOne({
      where: {id:req.body.userId },
    });
    console.log(shcart)
    //Find the specific Product in the cart
    let exsistingProduct = await db.CartItems.findOne({
      where: { productId: req.body.productId, userId: shcart.id },
    });
    if (exsistingProduct) {
      //Increment the quantity in the product if it is already in the cart
      await db.CartItems.update(
        { quantity: exsistingProduct.quantity + req.body.quantity },
        {
          where: { productId: req.body.productId, userId: shcart.id },
          transaction: t,
        }
      );
    } else {
      //Add the item to the cart if it does not exsist
      await db.CartItems.create(req.body, { transaction: t });
    }
    //Get the details of the cart product from the product model
    // let cartproduct = await db.Product.findOne({
    //   where: { id: req.body.productId },
    // });
    // //Find the cost = multiply the price of the product with quantity
    // let cost = cartproduct.price * req.body.quantity;
    //Update the cost in the Final cart for the user.
    // await db.Cart.update(
    //   { totalCost: shcart.totalCost + cost },
    //   { where: { userId: req.params.userid }, transaction: t }
    // );
    await t.commit();
    res.status(200).send({ message: "Item added to cart" });
  } catch (error) {
    await t.rollback();
    console.error("Error adding item to cart:", error);
    res.status(500).send({ error: "Failed to add item to cart" });
  }
});

//Remove an item from the cart
const removeFromCart = expressAsyncHandler(async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    //Cart of the specific user is taken through parameter
    let shcart = await db.User.findOne({
      where: {id:req.params.userid },
    });
    //Find the specific Product in the cart
    let exsistingProduct = await db.CartItems.findOne({
      where: { productId: req.params.productid, userId: shcart.id },
    });
    if (exsistingProduct) {
      //Get the details of the cart product from the product model
      // let cartproduct = await db.Product.findOne({
      //   where: { id: req.params.productid },
      // });
      // //Find the cost = multiply the price of the product with quantity
      // let cost = cartproduct.price * exsistingProduct.quantity;
      // //Update the cost in the Final cart for the user.
      // await db.Cart.update(
      //   { totalCost: shcart.totalCost - cost },
      //   { where: { userId: req.params.userid }, transaction: t }
      // );
      //remove the item from the cart
      await db.CartItems.destroy({
        where: { productId: req.params.productid },
        transaction: t,
      });
      await t.commit();
      res.status(200).send({ message: "Item removed from cart" });
    } else {
      await t.commit();
      res.status(404).send({ message: "No item to delete" });
    }
  } catch (error) {
    await t.rollback();
    console.error("Error adding item to cart:", error);
    res.status(500).send({ error: "Failed to delete item to cart" });
  }
});


//Clear the entire cart
const clearCart = expressAsyncHandler(async (req, res) => {
  let shcart = await db.User.findOne({ where: { id: req.params.userid } });
  await db.CartItems.destroy({ where: { userId: shcart.id } });
  res.status(200).send({ message: "Cart is all cleared!" });
});



const CartApp = {
  viewCartItems,
  addToCart,
  removeFromCart,
  clearCart,
};
module.exports = CartApp;
