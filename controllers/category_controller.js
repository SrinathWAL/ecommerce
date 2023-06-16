//import required packages
const expressAsyncHandler=require('express-async-handler')
//dotenv file import
require('dotenv').config()
const db=require('../models/index')

//To get all the categories
const allCategories=expressAsyncHandler(async(req,res)=>{
    let category=await db.Category.findAll()
    res.send({message:"The categories are : ",category})
})

//To get the details of a specific category
const specificCategory=expressAsyncHandler(async(req,res)=>{
    let category=await db.Category.findOne({where:{id:req.params.id}})
    if(!category){
        res.send({message:"There is no such category"})
    }
    else{
        res.send({message:"The Category is : ",category})
    }
})

//To get the products within a specific Category
const productsInCategory=expressAsyncHandler(async(req,res)=>{
    let product=await db.Product.findAll({where:{categoryId:req.params.id}})
    res.send({message:"The Products under the category are: ",product})
})

//Creating a New category 
const createNewCategory=expressAsyncHandler(async(req,res)=>{
    await db.Category.create(req.body)
    res.send({message:"New Category created successfully"})
})

//Deleting a Category
const deleteCategory=expressAsyncHandler(async(req,res)=>{
    let category=await db.Category.findOne({where:{id:req.params.id}})
    if(!category){
        res.send({message:"There is no such Category to delete"})
    }
    else{
        await db.Category.destroy({where:{id:req.params.id}})
        res.send({message:"The Cateory has been removed Successfully"})
    }

})

//To update a particular Category
const updateCategory=expressAsyncHandler(async(req,res)=>{
    let category=await db.Category.findOne({where:{id:req.params.id}})
    if(!category){
        res.send({message:"No such Category Exsists!"})
    }
    else{
        await db.Category.update(req.body,{where:{id:req.params.id}})
        res.send({message:"Category details updated Successfully!"})
    }
})

const CategoryApp={
    allCategories,
    specificCategory,
    productsInCategory,
    updateCategory,
    createNewCategory,
    deleteCategory
  }
module.exports=CategoryApp;