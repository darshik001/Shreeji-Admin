const { error } = require('console')
const adminModel = require('../Models/Admin.model')
const bcrypt = require('bcrypt')
const path = require('path')
const fs = require('fs')
exports.addAdminPage = async(req,res)=>{
     try {
        res.render('admin/AddAdmin')
     } catch (error) {
        console.log(error)
     }
}


exports.addAdmin = async(req,res)=>{
    try {
        if(req.body.password !== req.body.confirmpassword){
    res.redirect('/admin/add-admin')
        }
        let haspassword = await bcrypt.hash(req.body.password,10)
        let profileImage = ""
        if(req.file){
            profileImage = `/uploads/${req.file.filename}`
        }

        let admin = await adminModel.create({
            ...req.body,
            password:haspassword,
            profileImage:profileImage
        }) 
       
        res.redirect('/admin/add-admin')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


exports.viewAdmin = async(req,res)=>{
    try {
        console.log(req.query.search)
        let admins = await adminModel.find()
        res.render('Admin/ViewAdmin',{admins})
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

exports.deleteAdmin = async(req,res)=>{
    try {
        let id = req.params.id
        let admin = await adminModel.findById(id)
        if(admin.profileImage !==""){
          let imagepath = path.join(__dirname,'..',admin.profileImage)
          await fs.unlinkSync(imagepath)
        }

         await adminModel.findByIdAndDelete(id)
         res.redirect('/admin/view-admin')
    } catch (error) {
        
    }console.log(error)
}


exports.editAdminPage = async(req,res)=>{
    try {
        let id = req.params.id
        let admin = await adminModel.findById(id)
        

         
         res.render('Admin/EdiAtdmin',{admin})
    } catch (error) {
        
    }console.log(error)
}


exports.updateAdmin = async(req,res)=>{
    let id  = req.params.id
    try {
        let admin = await adminModel.findById(id)
        let profileImage = admin.profileImage
        if(req.file){
            if(profileImage !==""){
                let deletepath = path.join(__dirname,'..',profileImage)
                await fs.unlinkSync(deletepath)
            }
            profileImage = `/uploads/${req.file.filename}`
        }
        await adminModel.findByIdAndUpdate(id,{
            ...req.body,
            profileImage:profileImage
        },{new:true})
      return  res.redirect('/admin/view-admin')
    } catch (error) {
        console.log(error)
        res.redirect(`/admin/edit-admin/${id}`)
    }
}