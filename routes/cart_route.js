//Create Express Router
const exp=require("express");
const CartApp=exp.Router();

//Import the controller
const {
    viewCartItems,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    addUserCart
}=require("../controllers/cart_controller")

CartApp.use(exp.json())

//Retrieve the contents of the cart
CartApp.get('/cartItems',viewCartItems)
//Add an item to the shopping cart
CartApp.post('/cartItems/add',addToCart)
//Update the quantity or other details in the cart
CartApp.put('/cartItems/update',updateCart)
//Remove an item from the cart
CartApp.delete('/cartItems/remove/:id',removeFromCart)
//Clear the entire cart
CartApp.delete('/cartItems/clear',clearCart)

//create a user cart
CartApp.post('/carting',addUserCart)
module.exports=CartApp;
