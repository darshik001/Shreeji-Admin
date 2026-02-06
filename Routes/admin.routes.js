const express = require('express')
const { addAdminPage, addAdmin, viewAdmin, deleteAdmin } = require('../Controller/admin.controller')
const upload = require('../Middleware/ImageUploading')
const routes  =express.Router()

routes.get('/add-admin',addAdminPage)
routes.post('/add-admin',upload.single('profileImage'),addAdmin)
routes.get('/view-admin',viewAdmin)
routes.get('/delete-admin/:id',deleteAdmin)

module.exports = routes