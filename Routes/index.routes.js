const express = require('express')
const { homepage } = require('../Controller/index.controller')
const passport = require('passport')
const routes  =express.Router()

routes.get('/',passport.checkAuthenticated,homepage)

routes.use('/admin',passport.checkAuthenticated,require('./admin.routes'))
routes.use("/user",require('./auth.routes'))

// category subcategoryes and extracategoryes
routes.use('/category',passport.checkAuthenticated,require('./category.routes'))
routes.use('/subcategory',passport.checkAuthenticated,require('./subcategory.routes'))
routes.use('/extracategory',passport.checkAuthenticated,require('./extracategory.routes'))

routes.use('/findcategories',passport.checkAuthenticated,require('./findcategories.routes'))
// product routes
routes.use('/product',passport.checkAuthenticated,require('./product.routes'))


module.exports = routes