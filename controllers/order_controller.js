//import required packages
const expressAsyncHandler = require("express-async-handler");
//dotenv file import
require("dotenv").config();
const db = require("../models/index");

const placeOrder = expressAsyncHandler(async (req, res) => {
  // //Send the email to the user who placed the order in the background job.
    // //Initialising the transaction
  // const t = await db.sequelize.transaction();
  // try {
  //   //Get the cart of the specific User
  //   let userCart = await db.User.findOne({ where: { id: req.body.id } });
  //   //Get all the CartItems for placing the order
  //   let cartlist = await db.CartItems.findAll({ where: { userId: userCart.id } });
  //   //Check if the Cart has items or not
  //   if (cartlist.length != 0) {
  //     //Initialise finalCost
  //     let finalCost = 0;
  //     let InitialCost=0;
  //     for (const item of cartlist) {
  //       const product = await db.Product.findOne({where: { id: item.productId },include: [db.Inventory],});
  //       //Find the Discount for the product
  //       const discount = await db.Discount.findOne({where: { id: product.discountId },});
  //       //Check discountStatus 
  //       if (product.discountStatus == 1 && product.Inventory.quantity>=item.quantity) {
  //         InitialCost=product.price * item.quantity
  //         console.log(InitialCost)
  //         const discountAmount = product.price * discount.discountPercent;
  //         finalCost += (product.price - discountAmount) * item.quantity;
  //       } else if(product.discountStatus == 0 && product.Inventory.quanity>=item.quantity){
  //         finalCost += product.price * item.quantity;
  //       }
        
  //       //Update the Inventory after placing the order Successfully
  //       let updatedInventory = product.Inventory.quantity - item.quantity;
  //       await db.Inventory.update(
  //         { quantity: updatedInventory },
  //         { where: { id: product.Inventory.id }, transaction: t }
  //       );
  //     }
  //     //Create a record in the OrderDetails table
  //     await db.OrderDetails.create(
  //       { totalCost:InitialCost,discountCost: finalCost, userId: req.body.id ,status: 'success',orderDate: new Date()},
  //     );

  //     for(const item of cartlist){
  //       await db.OrderItems.create({productId:item.productId,quantity:item.quantity});
  //     }
  //     //Remove the Cart Items once the Order is placed
  //     await db.CartItems.destroy({
  //       where: { cartId: userCart.id },
  //       transaction: t,
  //     });
  //     await t.commit();
  //     res.send({ message: "Order Placed Successfully!" });
  //   } else {
  //     await t.commit();
  //     res.send({ message: "Shopping Cart is Empty" });
  //   }
  // } catch (error) {
  //   await t.rollback();
  //   res.send({ message: "Error occured", error });
  // }
  const t = await db.sequelize.transaction();
  try{
  const cartlist=await db.CartItems.findAll({where:{userId:req.body.id}})
  if(cartlist.length!=0){
    let finalCost = 0; let InitialCost=0;
    for(const item of cartlist){
      const product = await db.Product.findOne({where: { id: item.productId },include: [db.Inventory],});
      const discount = await db.Discount.findOne({where: { id: product.discountId }});
      if (product.Inventory.quantity > item.quantity) {
          InitialCost+=product.price * item.quantity
          if(product.discountStatus==1){
            const discountAmount = product.price * discount.discountPercent;
            finalCost = finalCost + (product.price - discountAmount) * item.quantity;
          }
          else{
            finalCost = finalCost + (product.price * item.quantity);
          }
        //Update the Inventory after placing the order Successfully
        let updatedInventory = product.Inventory.quantity - item.quantity;
        await db.Inventory.update(
          { quantity: updatedInventory },
          { where: { id: product.Inventory.id },transaction: t}
        );
      } 
    }
    let orderDetails=await db.OrderDetails.create(
      { totalCost:InitialCost,discountCost: finalCost, userId: req.body.id ,status:1,orderDate: new Date()});
    for(const item of cartlist){
      await db.OrderItems.create({productId:item.productId,quantity:item.quantity,orderId:orderDetails.id});
    }
    //Remove the Cart Items once the Order is placed
    await db.CartItems.destroy({where: { userId: req.body.id },transaction:t});
    await t.commit();
    res.send({ message: "Order Placed Successfully!" });
  }
  else{
    await t.commit();
    res.send({ message: "Shopping Cart is Empty" });
  }
  }catch(err){
    await t.rollback();
    res.send({message: "Error occured"});
  }
});

//To View all the Order Details of the user.
const viewOrderDetails=expressAsyncHandler(async(req,res)=>{
    const orderDetails=await db.OrderDetails.findAll({where:{userId:req.params.id},include:[
      db.User
    ]})
    res.send({message: " Your Order details are as follows : ",orderDetails})
})

const viewOrderedItems=expressAsyncHandler(async(req,res)=>{
    let items=await db.OrderItems.findAll({where:{orderId:req.params.orderid}});
    res.send({message:"Ordered Items",items}) 
})
const OrderApp = {
  placeOrder,
  viewOrderDetails,
  viewOrderedItems
};


module.exports = OrderApp;
