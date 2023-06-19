//Create Express Router
const exp=require("express");
const ProductApp=exp.Router();

//Import the controller
const {
   allProductDetails,
   specificProductDetails,
   updateProductDetails,
   createNewProduct,
   deleteProduct
}=require("../controllers/product_controller")

ProductApp.use(exp.json())

//Get all product details
ProductApp.get('/product/:pageNumber/:pageSize',allProductDetails)
//Get Specific product details
ProductApp.get('/product/:id',specificProductDetails)
//Update the product details
ProductApp.put('/product/:id',updateProductDetails)
//Create the new product
ProductApp.post('/product/create',createNewProduct)
//delete an exsisting product
ProductApp.delete('/product/:id',deleteProduct)

module.exports=ProductApp;
