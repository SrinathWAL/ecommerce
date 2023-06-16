//Create Express Router
const exp=require("express");
const CategoryApp=exp.Router();

//Import the controller
const {
  allCategories,
  specificCategory,
  productsInCategory,
  updateCategory,
  createNewCategory,
  deleteCategory
}=require("../controllers/category_controller")

CategoryApp.use(exp.json())

//To get all the categories
CategoryApp.get('/allcategories',allCategories)
//To get a Specific Category
CategoryApp.get('/category/:id',specificCategory)
//To get the products in a specific category
CategoryApp.get('/category/:id/products',productsInCategory)
//To create a new Category
CategoryApp.post('/category/new',createNewCategory)
//To delete a Category
CategoryApp.delete('/category/remove/:id',deleteCategory)
//To Update a particular Category
CategoryApp.put('/category/:id',updateCategory)

module.exports=CategoryApp;
