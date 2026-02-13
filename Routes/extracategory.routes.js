const express = require('express')
const { getsubcategory,AddextracategoryPage,AddextraCategory,viewextraCategory } = require('../Controller/extracategory.controller')
const routes = express.Router()


routes.get('/add-extracategory',AddextracategoryPage)
routes.post('/add-extracategory',AddextraCategory)
routes.get('/view-extracategory',viewextraCategory)



// find subcategory base on category 
routes.get('/getsubcategory/:id',getsubcategory) 
module.exports = routes