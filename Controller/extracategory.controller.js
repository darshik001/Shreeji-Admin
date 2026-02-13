let categoryModel = require('../Models/Category.model')
let subcategoryModel = require('../Models/Subcategory.model')
let extracategoryModel = require('../Models/Extracategory.model')
exports.AddextracategoryPage = async(req,res)=>{
    try {
        let category = await categoryModel.find()
        let subcategory = await subcategoryModel.find()
        res.render('Extracategory/Addextracategory',{category,subcategory})
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/')
    }
}


exports.AddextraCategory = async(req,res)=>{
    try {
        await extracategoryModel.create(req.body)
        req.flash('success','Extra Category Added!!!')
        res.redirect('/extracategory/add-extracategory')
    } catch (error) {
        req.flash('error',error.message)
        console.log(error.message)
        res.redirect('/extracategory/add-extracategory')
    }
}


// get sub category 


exports.getsubcategory = async(req,res)=>{
    try {
        let id = req.params.id
       let getsubcategory = await subcategoryModel.find({categoryid:id})
          res.json({message:'get subcategory',subcategory:getsubcategory})
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/extracategory/add-extracategory')
    }
}

exports.viewextraCategory = async(req,res)=>{
    try {
        let search = ''
        let extracategory = await extracategoryModel.aggregate([
            {
                $lookup:{
                    from:'categories',
                    localField:'categoryid',
                    foreignField:'_id',
                    as:'categoryid'
                }
            },
            {
                $unwind:{path:'$categoryid'}
            },
             {
                $lookup:{
                    from:'subcategories',
                    localField:'subcategoryid',
                    foreignField:'_id',
                    as:'subcategoryid'
                }
            },
            {
                $unwind:{path:'$subcategoryid'}
            }
        ])
        console.log(extracategory)
        res.render('Extracategory/Viewsextracategories',{extracategory,search,totalpage:10,currntpage :1})
    } catch (error) {
        req,flash('error',error.message)
        res.redirect('/')
    }
}