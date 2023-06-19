//import required packages
const expressAsyncHandler = require("express-async-handler");
//dotenv file import
require("dotenv").config();
const db = require("../models/index");

//To get all the Product Details (Used Pagination)
const allProductDetails = expressAsyncHandler(async (req, res) => {
  const pageNumber = req.params.pageNumber;
  const pageSize = req.params.pageSize;
  const offset = (pageNumber - 1) * pageSize;
  // Get total count of products
  const totalCount = await db.Product.count(); 
  //Set the page size and limit to display the products 
  const products = await db.Product.findAll({
    include: [db.Inventory, db.Category, db.Discount],
    offset: offset,
    limit: parseInt(pageSize),
  });
  
  res.status(200).send({
    message: "All Product details Fetched Successfully.",
    products,
    pageNumber: parseInt(pageNumber),
    pageSize: parseInt(pageSize),
    totalCount,
  });
});



//To get a specific Product details
const specificProductDetails = expressAsyncHandler(async (req, res) => {
  let product = await db.Product.findOne(
    {
      where: { id: req.params.id },
      include: [db.Inventory, db.Category, db.Discount],
    }
  );
  if (!product) {
    res.status(404).send({ message: "Product not found" });
  } else {
    res
      .status(200)
      .send({ message: "Product details fetched successfully.", product });
  }
});

//To update a specific product deatils
const updateProductDetails = expressAsyncHandler(async (req, res) => {
  let product = await db.Product.findOne({ where: { id: req.params.id } });
  if (!product) {
    res.status(404).send({ message: "No product found to update" });
  } else {
    await db.Product.update(req.body, { where: { id: req.params.id } });
    res.status(200).send({ message: "Product updated successfully " });
  }
});

//To Add a new product
const createNewProduct = expressAsyncHandler(async (req, res) => {
  await db.Product.create(req.body);
  res.status(201).send({ message: "Product created successfully" });
});

//To delete an exsisting Product
const deleteProduct = expressAsyncHandler(async (req, res) => {
  let product = await db.Product.findOne({ where: { id: req.params.id } });
  if (!product) {
    res.status(404).send({ message: "No product exsists with that id" });
  } else {
    await db.Product.destroy({ where: { id: req.params.id } });
    res.status(200).send({ message: "Product deleted successfully." });
  }
});
const ProductApp = {
  allProductDetails,
  specificProductDetails,
  updateProductDetails,
  createNewProduct,
  deleteProduct,
};
module.exports = ProductApp;
