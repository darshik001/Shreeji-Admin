const express = require("express")
const { addcategoryPage ,addCategory,viewCategoryPage,deleteCategory,editCategory,updateCategory} = require("../Controller/category.controller")
const upload = require("../Middleware/ImageUploading")
const routes = express.Router()

routes.get('/add-category',addcategoryPage)
routes.post('/add-category',upload.single('categoryImage'),addCategory)
routes.get('/view-category',viewCategoryPage)
routes.get('/delete-category/:id',deleteCategory)
routes.get('/edit-category/:id',editCategory)
routes.post('/update-category/:id',upload.single("categoryImage"),updateCategory)

module.exports = routes