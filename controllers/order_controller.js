//import required packages
const expressAsyncHandler = require("express-async-handler");
//dotenv file import
require("dotenv").config();
const db = require("../models/index");

const placeOrder = expressAsyncHandler(async (req, res) => {
  //Send the email to the user who placed the order in the background job.
  //Initialising the transaction
  const t = await db.sequelize.transaction();
  try {
    //Get the cart of the specific User
    let userCart = await db.Cart.findOne({ where: { userId: req.params.id } });
    //Get all the CartItems for placing the order
    let order = await db.CartItems.findAll({ where: { cartId: userCart.id } });
    //Check if the Cart has items or not
    if (order.length != 0) {
      //Initialise finalCost
      let finalCost = 0;
      for (const item of order) {
        //Find the Product in the order
        const product = await db.Product.findOne({
          where: { id: item.productId },
          include: [db.Inventory],
        });
        //Find the Discount for the product
        const discount = await db.Discount.findOne({
          where: { id: product.discountId },
        });
        //Check discountStatus 
        if (product.discountStatus == 1) {
          const discountAmount = product.price * discount.discountPercent;
          finalCost += (product.price - discountAmount) * item.quantity;
        } else {
          finalCost += product.price * item.quantity;
        }
        //Update the Inventory after placing the order Successfully
        let updatedInventory = product.Inventory.quantity - item.quantity;
        await db.Inventory.update(
          { quantity: updatedInventory },
          { where: { id: product.Inventory.id }, transaction: t }
        );
      }
      //Create a record in the Order table
      await db.Order.create(
        { discountCost: finalCost, userId: req.params.id },
        { transaction: t }
      );
      //Remove the Cart Items once the Order is placed
      await db.CartItems.destroy({
        where: { cartId: userCart.id },
        transaction: t,
      });
      //Update the Cart totalCost to 0 for the nextorder.
      await db.Cart.update(
        { totalCost: 0 },
        { where: { userId: req.params.id }, transaction: t }
      );
      await t.commit();
      res.send({ message: "Order Placed Successfully!" });
    } else {
      await t.commit();
      res.send({ message: "Shopping Cart is Empty" });
    }
  } catch (error) {
    await t.rollback();
    res.send({ message: "Error occured", error });
  }
});

//To View all the Order Details of the user.
const viewOrderDetails=expressAsyncHandler(async(req,res)=>{
    const orderDetails=await db.Order.findAll({where:{userId:req.params.id}})
    res.send({message: " Your Order details are as follows : ",orderDetails})
})

const OrderApp = {
  placeOrder,
  viewOrderDetails
};


module.exports = OrderApp;
