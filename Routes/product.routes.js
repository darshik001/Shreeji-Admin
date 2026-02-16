const express = require('express')
const { AddproductPage,Addproduct,Viewproduct } = require('../Controller/product.controller')
const upload = require('../Middleware/ImageUploading')
const routes = express.Router()


routes.get('/add-product',AddproductPage)
routes.post('/add-product',upload.array('productImage',4),Addproduct)
routes.get('/view-product',Viewproduct)
module.exports = routes