const categoryModel = require('../Models/Category.model')
const subcategoryModel = require('../Models/Subcategory.model')
const extracategoryModel = require('../Models/Extracategory.model')

const path = require('path')
const fs = require('fs')
exports.addcategoryPage = async(req,res)=>{
try {
    res.render('Category/Addcategory')
} catch (error) {
    req.flash('error',error.message)
    res.redirect('/')
}
}

exports.addCategory = async(req,res)=>{
    try {
        let imagepath = ""
      if(req.file){
        imagepath = `/uploads/${req.file.filename}`
      }

      let categories = await categoryModel.create({
        ...req.body,
        categoryImage:imagepath
      })
      console.log(categories)

        req.flash('success','Category Added!!!')
        res.redirect('/category/view-category')
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/')

    }
}



exports.viewCategoryPage = async(req,res)=>{
    try {
        let search = req.query.search ||""
        let filter = {
  $or: [
    { category: { $regex: search, $options: "i" } },
    { description: { $regex: search, $options: "i" } }
  ]
}
        let categories = await categoryModel.find(filter)
        res.render('Category/Viewcategories',{categories,search})
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/')
    }
}


exports.deleteCategory = async(req,res)=>{
    try {
        let id = req.params.id
        let category = await categoryModel.findById(id)
        if(category.categoryImage !==""){
            let imagepath = path.join(__dirname,"..",category.categoryImage)
            await fs.unlinkSync(imagepath)
        }

        await categoryModel.findByIdAndDelete(id)
        await subcategoryModel.deleteMany({categoryid:id})
        await extracategoryModel.deleteMany({categoryid:id})
        req.flash('success','Category Deleted!!!')
        res.redirect('/category/view-category')
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/category/view-category')
    }
}


exports.editCategory = async(req,res)=>{
    try {
        let id = req.params.id
        let category = await categoryModel.findById(id)
        if(!category){
              req.flash('error','Category Not Found')
       return res.redirect('/category/view-category')
        }
        res.render('Category/Editcategory',{category})

    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/category/view-category')
    }
}

exports.updateCategory = async(req,res)=>{
    try {
       let id = req.params.id
       let category = await categoryModel.findById(id)
       let categoryImage = category.categoryImage
       if(req.file){
        if(categoryImage !==""){
            let imagepath = path.join(__dirname,"..",categoryImage)
            await fs.unlinkSync(imagepath)
        }
        categoryImage = `/uploads/${req.file.filename}`
       }
          await categoryModel.findByIdAndUpdate(id,{
            ...req.body,
            categoryImage:categoryImage
          },{new:true})
          req.flash('success',"Category Update!!!")
          res.redirect('/category/view-category')
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/category/view-category')
    }
}
