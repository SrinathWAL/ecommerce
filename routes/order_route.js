//Create Express Router
const exp=require("express");
const OrderApp=exp.Router();

//Import the controller
const {
    placeOrder,
    viewOrderDetails
}=require("../controllers/order_controller")

OrderApp.use(exp.json())

//Route to place an order by the user and also mail in Baground job.
OrderApp.get('/placeOrder/user/:id',placeOrder)
//View the Order placed but the user
OrderApp.get('/orderDetails/user/:id',viewOrderDetails)

module.exports=OrderApp;
