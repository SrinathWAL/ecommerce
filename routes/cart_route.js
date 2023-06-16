//Create Express Router
const exp=require("express");
const CartApp=exp.Router();

//Import the controller
const {
    viewCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    addUserCart
}=require("../controllers/cart_controller")

CartApp.use(exp.json())

//Retrieve the contents of the cart
CartApp.get('/cartItems',viewCartItems)
//Add an item to the shopping cart
CartApp.post('/cartItems/add/:userid',addToCart)
//Remove an item from the cart
CartApp.delete('/cartItems/remove/user/:userid/product/:productid',removeFromCart)
//Clear the entire cart
CartApp.delete('/cartItems/clear/user/:userid',clearCart)

//create a user cart
CartApp.post('/carting',addUserCart)
module.exports=CartApp;
