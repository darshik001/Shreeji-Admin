const express = require('express')
const { addsubcategoryPage,addsubCategory,viewsubCategories,EditsubCategories,UpdatesubCategories,DeletesubCategories } = require('../Controller/subcategory.controller')
const routes = express.Router()

routes.get('/add-subcategory',addsubcategoryPage)
routes.post('/add-subcategory',addsubCategory)
routes.get('/view-subcategory',viewsubCategories)
routes.get('/edit-subcategory/:id',EditsubCategories)
routes.post('/update-subcategory/:id',UpdatesubCategories)
routes.get('/delete-subcategory/:id',DeletesubCategories)
module.exports = routes