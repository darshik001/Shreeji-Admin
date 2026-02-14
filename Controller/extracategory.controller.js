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
        let search = req.query.search ||""
        let page  = req.query.page || 1
        let limit = 5
        let skip = Math.ceil(page - 1) * limit
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
            },
            {
                $match:{
                    $or:[
                        {'categoryid.category':{$regex:search,$options:'i'}},
                        {'subcategoryid.subcategory':{$regex:search,$options:'i'}},
                        {extracategory:{$regex:search,$options:'i'}},
                    ]
                }
            },
            {
                $facet:{
                    data:[
                        {
                            $skip:skip
                        },
                        {
                            $limit:limit
                        }
                    ],
                    totalcount:[
                        {$count:'count'}
                    ]
                }
            }
        ])
        let totalrecord = extracategory[0].totalcount[0]?.count
        totalpage = Math.ceil(totalrecord/limit)
        extracategory = extracategory[0].data
        res.render('Extracategory/Viewsextracategories',{extracategory,search,totalpage:totalpage,currntpage :page})
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/')
    }
}



exports.EditextraCategory = async(req,res)=>{
    try {
       let id = req.params.id
       let extracategory = await extracategoryModel.findById(id)
       res.render("Extracategory/Editextracategory",{extracategory})

    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/extracategory/view-extracategory')
    }
}


exports.UpdateextraCategory = async(req,res)=>{
    try {
        let id = req.params.id
        await extracategoryModel.findByIdAndUpdate(id,req.body,{new:true})
        req.flash('success',"ExtraCategory Updated!!!")
        res.redirect('/extracategory/view-extracategory')
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/extracategory/view-extracategory')
    }
}


exports.DeleteextraCategory=async(req,res)=>{
    try {
        let id = req.params.id
        await extracategoryModel.findByIdAndDelete(id)
        req.flash('success','extracategory Deleted')
        res.redirect('/extracategory/view-extracategory')
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/extracategory/view-extracategory')
    }
}