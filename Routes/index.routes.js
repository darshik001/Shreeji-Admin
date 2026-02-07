const express = require('express')
const { homepage } = require('../Controller/index.controller')
const passport = require('passport')
const routes  =express.Router()

routes.get('/',passport.checkAuthenticated,homepage)

routes.use('/admin',passport.checkAuthenticated,require('./admin.routes'))
routes.use("/user",require('./auth.routes'))
module.exports = routes