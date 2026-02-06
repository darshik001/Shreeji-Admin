const express = require('express')
const { homepage } = require('../Controller/index.controller')
const routes  =express.Router()

routes.get('/',homepage)

routes.use('/admin',require('./admin.routes'))

module.exports = routes