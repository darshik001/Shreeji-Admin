const express = require('express')
const { addAdminPage, addAdmin, viewAdmin, deleteAdmin, editAdminPage, updateAdmin } = require('../Controller/admin.controller')
const upload = require('../Middleware/ImageUploading')
const routes  =express.Router()

routes.get('/add-admin',addAdminPage)
routes.post('/add-admin',upload.single('profileImage'),addAdmin)
routes.get('/view-admin',viewAdmin)
routes.get('/delete-admin/:id',deleteAdmin)
routes.get('/edit-admin/:id',editAdminPage)
routes.post('/update-admin/:id',upload.single('profileImage'),updateAdmin)

module.exports = routes