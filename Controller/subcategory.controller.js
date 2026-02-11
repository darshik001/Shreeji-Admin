const categoryModel = require('../Models/Category.model')
const subcategoryModel = require('../Models/Subcategory.model')



exports.addsubcategoryPage = async(req,res)=>{
    try {
        let category = await categoryModel.find()
        res.render('Subcategory/Addsubcategory',{category})
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/')
    }
}


exports.addsubCategory = async(req,res)=>{
    try {
        let subcategory = await subcategoryModel.create(req.body)
        console.log(subcategory)
        req.flash('success','Sub Category Added!!!')
        res.redirect('/subcategory/add-subcategory')
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/subcategory/add-subcategory')
    }
}


exports.viewsubCategories = async(req,res)=>{
    try {
        res.render('Subcategory/Viewsubcategories')
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/')
    }
}