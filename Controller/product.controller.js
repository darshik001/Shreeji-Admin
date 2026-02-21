const mongoose = require('mongoose')
const categoryModel = require('../Models/Category.model')
const productModel = require('../Models/Product.model')
const fs = require('fs')
const path = require('path')

exports.AddproductPage = async (req, res) => {
    try {
        let category = await categoryModel.find()
        res.render('Product/Addproduct', { category })
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/')
    }
}


exports.Addproduct = async (req, res) => {
    try {
        let productImage = []
        if (req.files) {
            req.files.map((image) => {
                let imagepath = `/uploads/${image.filename}`
                productImage.push(imagepath)
            })
        }

        let product = await productModel.create({
            ...req.body,
            userid: req.user._id,
            productImage: productImage
        })
        console.log(product)
        req.flash('success', 'Product Added!!!')
        res.redirect('/product/add-product')

    } catch (error) {
        req.flash("error", error.message)
        res.redirect('/product/add-product')
    }
}


exports.Viewproduct = async (req, res) => {
    try {
        let search = req.query.search || ""
        let category = req.query.category || ""
        let sort = req.query.sort || ""

        let sortStage = { createdAt: -1 } // default latest

        if (sort === "low") sortStage = { price: 1 }
        if (sort === "heigh") sortStage = { price: -1 }
        if (sort === "name") sortStage = { name: 1 }
        let categories = await categoryModel.find()
        console.log(category)
        let page = Number(req.query.page) || 1
        let limit = 10;
        let skip = Math.ceil(page - 1) * limit
        let result = await productModel.aggregate([
            {
                $match: {
                    "userid": new mongoose.Types.ObjectId(req.user._id),
                }
            },
            {
                $lookup: {
                    from: 'admins',
                    localField: 'userid',
                    foreignField: '_id',
                    as: 'userid'
                }
            },
            { $unwind: { path: '$userid' } },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryid',
                    foreignField: '_id',
                    as: 'categoryid'
                }
            },
            { $unwind: { path: '$categoryid' } },
            {
                $lookup: {
                    from: 'subcategories',
                    localField: 'subcategoryid',
                    foreignField: '_id',
                    as: 'subcategoryid'
                }
            },
            { $unwind: { path: '$subcategoryid' } },
            {
                $lookup: {
                    from: 'extracategories',
                    localField: 'extracategoryid',
                    foreignField: '_id',
                    as: 'extracategoryid'
                }
            },
            { $unwind: { path: '$extracategoryid' } },
            {
                $match: {
                    $and: [

                        // SEARCH FILTER
                        {
                            $or: [
                                { 'categoryid.category': { $regex: search, $options: 'i' } },
                                { 'subcategoryid.subcategory': { $regex: search, $options: 'i' } },
                                { 'extracategoryid.extracategory': { $regex: search, $options: 'i' } },
                                { name: { $regex: search, $options: 'i' } }
                            ]
                        },

                        // CATEGORY FILTER
                        category
                            ? {
                                $or: [
                                    { 'categoryid.category': { $regex: category, $options: 'i' } },
                                    { 'subcategoryid.subcategory': { $regex: category, $options: 'i' } },
                                    { 'extracategoryid.extracategory': { $regex: category, $options: 'i' } }
                                ]
                            }
                            : {} // if category empty → ignore filter

                    ]
                }

            },
            {
                $sort: sortStage

            },
            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: limit }
                    ],
                    totalcount: [
                        { $count: 'count' }
                    ]
                }
            }
        ])


        let totalrecod = result[0].totalcount[0]?.count || 1
        let totalpage = Math.ceil(totalrecod / limit)
        let products = result[0].data
        res.render('Product/Viewproduct', { products, search, totalpage, currentpage: page, category, categories, sort })
    } catch (error) {
        console.log(error.message)
        req.flash('error', error.message)
        res.redirect('/')
    }
}

exports.Deleteproduct = async(req,res)=>{
    try {
        let id  = req.params.id
        let product = await productModel.findById(id)
      if(product.productImage){
        product.productImage.forEach(async(img)=>{
            let imagepath = path.join(__dirname,'..',img)
            await fs.unlinkSync(imagepath)
        })
      }

       await productModel.findByIdAndDelete(id)
      req.flash('success','Product Deleted!!!')
      res.redirect('/product/view-product')
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/product.view-product')
    }
}



exports.Editproduct = async(req,res)=>{
    try {
        let id = req.params.id
        let product = await productModel.findById(id).populate('categoryid').populate('subcategoryid').populate('extracategoryid')
        console.log(product)
        let category = await categoryModel.find()
        res.render('Product/Editproduct',{product,category})
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/product/view-prodcut')
    }
}