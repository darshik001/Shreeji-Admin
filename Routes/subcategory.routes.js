const express = require('express')
const { addsubcategoryPage,addsubCategory,viewsubCategories } = require('../Controller/subcategory.controller')
const routes = express.Router()

routes.get('/add-subcategory',addsubcategoryPage)
routes.post('/add-subcategory',addsubCategory)
routes.get('/view-subcategory',viewsubCategories)
module.exports = routes