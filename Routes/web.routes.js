const express = require('express')
const { webPage,singleView } = require('../Controller/web.controller')
const routes = express.Router()

routes.get('/',webPage)
routes.get("/singleview/:id",singleView)
module.exports = routes