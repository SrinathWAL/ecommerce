//import required packages
const expressAsyncHandler = require("express-async-handler");
//dotenv file import
require("dotenv").config();
const db = require("../models/index");

//To get all the categories
const allCategories = expressAsyncHandler(async (req, res) => {
  const pageNumber = req.params.pageNumber;
  const pageSize = req.params.pageSize;
  const offset = (pageNumber - 1) * pageSize;
  // Get total count of Categories
  const totalCount = await db.Category.count(); 
  //Set the page size and limit to display the Categories
  let category = await db.Category.findAll({
    offset: offset,
    limit: parseInt(pageSize),
  });
  res.status(200).send({ message: "Categories fetched successfully", 
  category,
  pageNumber: parseInt(pageNumber),
  pageSize: parseInt(pageSize),
  totalCount,
  });
});

//To get the details of a specific category
const specificCategory = expressAsyncHandler(async (req, res) => {
  let category = await db.Category.findOne({ where: { id: req.params.id } });
  if (!category) {
    res.status(404).send({ message: "There is no such category" });
  } else {
    res.status(200).send({ message: "Category retrieved successfully", category });
  }
});

//To get the products within a specific Category
const productsInCategory = expressAsyncHandler(async (req, res) => {
  let product = await db.Product.findAll({
    where: { categoryId: req.params.id },
  });
  res.status(200).send({ message: "Products Fetched Successfully ", product });
});

//Creating a New category
const createNewCategory = expressAsyncHandler(async (req, res) => {
  await db.Category.create(req.body);
  res.status(201).send({ message: "New Category created successfully" });
});

//Deleting a Category
const deleteCategory = expressAsyncHandler(async (req, res) => {
  let category = await db.Category.findOne({ where: { id: req.params.id } });
  if (!category) {
    res.status(404).send({ message: "There is no such Category to delete" });
  } else {
    await db.Category.destroy({ where: { id: req.params.id } });
    res.status(200).send({ message: "The Cateory has been removed Successfully" });
  }
});

//To update a particular Category
const updateCategory = expressAsyncHandler(async (req, res) => {
  let category = await db.Category.findOne({ where: { id: req.params.id } });
  if (!category) {
    res.status(404).send({ message: "No such Category Exsists!" });
  } else {
    await db.Category.update(req.body, { where: { id: req.params.id } });
    res.status(200).send({ message: "Category details updated Successfully!" });
  }
});

const CategoryApp = {
  allCategories,
  specificCategory,
  productsInCategory,
  updateCategory,
  createNewCategory,
  deleteCategory,
};
module.exports = CategoryApp;
