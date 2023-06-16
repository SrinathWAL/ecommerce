//import required packages
const expressAsyncHandler=require('express-async-handler')
//dotenv file import
require('dotenv').config()
const db=require('../models/index')

//Retrieve the contents of the cart
const viewCartItems=expressAsyncHandler(async(req,res)=>{
    let item=await db.cartItems.findAll()
    if(item.length==0){
        res.send({message:"There are no items in the cart"})
    }
    else{
        let items=await db.cartItems.findAll()
        res.send({message: "Cart contains : ",items})
    }
})
//Add an item to the shopping cart
const addToCart = expressAsyncHandler(async (req, res) => {
    try {
      // Create a new cart item in the cartItems table
      await db.cartItems.create(req.body);
      res.status(200).json({ message: 'Item added to cart' });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Failed to add item to cart' });
    }
  });
  
//Update the quantity or other details in the cart
const updateCart=expressAsyncHandler(async(req,res)=>{

})
//Remove an item from the cart
const removeFromCart=expressAsyncHandler(async(req,res)=>{
    await db.cartItems.destroy({where:{productId:req.params.id}})
    res.send({message:"Item removed from cart"})
})
//Clear the entire cart
const clearCart=expressAsyncHandler(async(req,res)=>{
})
//Add a user cart
const addUserCart=expressAsyncHandler(async(req,res)=>{
    let response=await db.Cart.create(req.body);
    res.send({message:"Cart is created for the user"})
})
const CartApp={
    viewCartItems,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    addUserCart
  }
module.exports=CartApp;