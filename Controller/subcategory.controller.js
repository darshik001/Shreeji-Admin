const categoryModel = require('../Models/Category.model')
const subcategoryModel = require('../Models/Subcategory.model')
const extracategoryModel = require('../Models/Extracategory.model')


exports.addsubcategoryPage = async (req, res) => {
    try {
        let category = await categoryModel.find()
        res.render('Subcategory/Addsubcategory', { category })
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/')
    }
}


exports.addsubCategory = async (req, res) => {
    try {
        let subcategory = await subcategoryModel.create(req.body)
        console.log(subcategory)
        req.flash('success', 'Sub Category Added!!!')
        res.redirect('/subcategory/view-subcategory')
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/subcategory/add-subcategory')
    }
}


exports.viewsubCategories = async (req, res) => {
    try {
        let page = Number(req.query.page) || 1
        let limit = 10;
        let skip = Math.ceil(page - 1) * limit
        let search = req.query.search || "";
        console.log(search)
        // let subcategory = await subcategoryModel.find().populate('categoryid')
        let subcategory = await subcategoryModel.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryid',
                    foreignField: '_id',
                    as: 'categoryid'
                }
            },
            {
                $unwind: { path: '$categoryid' }
            },
            {
                $match: {
                    $or: [
                        { subcategory: { $regex: search, $options: 'i' } },
                        { "categoryid.category": { $regex: search, $options: 'i' } },
                    ]
                }
            },
            {
                $sort: {
                    subcategory: 1
                }
            },
            {
                $facet: {
                    data: [

                        {
                            $skip: skip
                        },
                        {
                            $limit: limit
                        }
                    ],
                    totalcount: [
                        {
                            $count: 'count'
                        }
                    ]
                }
            }
        ])

        let totalrecord = subcategory[0].totalcount[0]?.count || 0
        let totalpage = Math.ceil(totalrecord / limit)
        subcategory = subcategory[0].data
        res.render('Subcategory/Viewsubcategories', { subcategory, search, totalpage, currntpage: page })
    } catch (error) {
        console.log(error.message)
        req.flash('error', error.message)
        res.redirect('/')
    }
}


exports.EditsubCategories = async(req,res)=>{
    try {
        let id = req.params.id
        let subcategory = await subcategoryModel.findById(id)
        res.render('Subcategory/Editsubcategory',{subcategory})
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/subcategory/view-subcategory')
    }
}

exports.UpdatesubCategories = async(req,res)=>{
    try {
        let id = req.params.id
        await subcategoryModel.findByIdAndUpdate(id,{...req.body},{new:true})
        req.flash('success','subcategory Updated!!!')
        res.redirect('/subcategory/view-subcategory')
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/subcategory/view-subcategory')
    }
}

exports.DeletesubCategories = async(req,res)=>{
    try {
       let id = req.params.id
        await subcategoryModel.findByIdAndDelete(id)
        await extracategoryModel.deleteMany({subcategoryid:id})
        req.flash('success','subcategory Deleted!!!')
        res.redirect('/subcategory/view-subcategory')
        
    } catch (error) {
        req.falsh('error',error.message)
                res.redirect('/subcategory/view-subcategory')

    }
}