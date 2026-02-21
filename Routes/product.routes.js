const express = require('express')
const { AddproductPage,Addproduct,Viewproduct,Deleteproduct,Editproduct } = require('../Controller/product.controller')
const upload = require('../Middleware/ImageUploading')
const routes = express.Router()


routes.get('/add-product',AddproductPage)
routes.post('/add-product',upload.array('productImage',4),Addproduct)
routes.get('/view-product',Viewproduct)
routes.get('/delete-product/:id',Deleteproduct)
routes.get('/edit-product/:id',Editproduct)
module.exports = routes