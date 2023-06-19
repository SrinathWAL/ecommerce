//import required packages
const expressAsyncHandler = require("express-async-handler");
//dotenv file import
require("dotenv").config();
const db = require("../models/index");

const applyDiscount = expressAsyncHandler(async (req, res) => {
  //The first step is to get the price of the product
  let product = await db.Product.findOne({ where: { id: req.params.id } });
  //Get the discount amount on the the product.
  let discountDetails = await db.Discount.findOne({
    where: { id: product.discountId },
  });
  let discountAmount = product.price * discountDetails.discountPercent;
  //Subtract the amount from the price of the product.
  let updatedamount = product.price - discountAmount;
  //Update the Product DB with the discounted price.
  await db.Product.update(
    { price: updatedamount },
    { where: { id: req.params.id } }
  );
  res.send({ message: "Discount applied successfully", product });
});

const removeDiscount = expressAsyncHandler(async (req, res) => {
  //The first stp is to get the price of the product
  let product = await db.Product.findOne({ where: { id: req.params.id } });
  //get the discount amount on the product.
  let discountDetails = await db.Discount.findOne({
    where: { id: product.discountId },
  });
  let discountAmount = product.price * discountDetails.discountPercent;
  //Add the discount amount to the product.
  let updatedamount = product.price + discountAmount;
  //Update the Product DB with the original amount.
  await db.Product.update(
    { price: updatedamount },
    { where: { id: req.params.id } }
  );
  res.send({ message: "Discount removed successfully", product });
});
const DiscountApp = {
  applyDiscount,
  removeDiscount,
};
module.exports = DiscountApp;
