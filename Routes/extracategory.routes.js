const express = require('express')
const { AddextracategoryPage,AddextraCategory,viewextraCategory,EditextraCategory,UpdateextraCategory,DeleteextraCategory } = require('../Controller/extracategory.controller')
const routes = express.Router()


routes.get('/add-extracategory',AddextracategoryPage)
routes.post('/add-extracategory',AddextraCategory)
routes.get('/view-extracategory',viewextraCategory)
routes.get('/edit-extracategory/:id',EditextraCategory)
routes.post('/update-extracategory/:id',UpdateextraCategory)
routes.get('/delete-extracategory/:id',DeleteextraCategory)




// find subcategory base on category 
module.exports = routes