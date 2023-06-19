//Create Express Router
const exp=require("express");
const DiscountApp=exp.Router();

//Import the controller
const {
    applyDiscount,
    removeDiscount

}=require("../controllers/discount_controller")

DiscountApp.use(exp.json())

//Apply the discount to the product
DiscountApp.post('/discount/apply/product/:productid',applyDiscount)
//Remove discount to the product.
DiscountApp.post('/discount/remove/producct/:productid',removeDiscount)

module.exports=DiscountApp;
