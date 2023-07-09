//Create Express Router
const exp=require("express");
const OrderApp=exp.Router();

//Import the controller
const {
    placeOrder,
    viewOrderDetails,
    viewOrderedItems
}=require("../controllers/order_controller")

OrderApp.use(exp.json())

//Route to place an order by the user and also mail in Baground job.
OrderApp.post('/placeOrder/user',placeOrder)
//View the Order placed but the user
OrderApp.get('/orderDetails/user/:id',viewOrderDetails)
//View the Ordered Items
OrderApp.get('/orderItems/:orderid',viewOrderedItems)

module.exports=OrderApp;
