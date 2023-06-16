//import required packages
const expressAsyncHandler=require('express-async-handler')
//dotenv file import
require('dotenv').config()
const db=require('../models/index')

//To get all the Product Details
const allProductDetails = expressAsyncHandler(async (req, res) => {
    let products = await db.Product.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt',
      'categoryId','discountId','inventoryId']
      },
    });
    res.send({ message: "Product details are:", products });
  });

//To get a specific Product details
const specificProductDetails=expressAsyncHandler(async(req,res)=>{
  let product=await db.Product.findOne({where: {id:req.params.id}})
  if(!product){
    res.send({message: "Product not found"})
  }
  else{
    res.send({message:"The Product is : ",product})
  }
}) 

//To update a specific product deatils
const updateProductDetails=expressAsyncHandler(async(req,res)=>{
  let product=await db.Product.findOne({where:{id:req.params.id}})
  if(!product){
    res.send({message:"There is no product to update"})
  }
  else{
    await db.Product.update(req.body,{where:{id:req.params.id}})
    res.send({message:"Product updated successfully "});
  }
})

//To Add a new product
const createNewProduct=expressAsyncHandler(async(req,res)=>{
  await db.Product.create(req.body)
  res.send({message:"Product created successfully"})
})

//To delete an exsisting Product 
const deleteProduct=expressAsyncHandler(async(req,res)=>{
  let product=await db.Product.findOne({where:{id:req.params.id}})
  if(!product){
    res.send({message:"No product exsists with that id"})
  }
  else{
    await db.Product.destroy({where:{id:req.params.id}})
    res.send({message:"Product deleted successfully."})
  }

})
const ProductApp={
    allProductDetails,
    specificProductDetails,
    updateProductDetails,
    createNewProduct,
    deleteProduct
  }
module.exports=ProductApp;