const productModel = require('../Models/Product.model')
const categoryModel = require('../Models/Category.model')
const mongoose = require('mongoose')
exports.webPage = async(req,res)=>{
    try {
        // let products = await productModel.find().populate('categoryid').populate('subcategoryid').populate('extracategoryid')
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

        res.render('Web/Home',{products,search,totalpage,categories,category,sort})
    } catch (error) {
        console.log(error)
        req.flash('error',error.message)
        res.redirect('/user/login')
    }
}


exports.singleView = async(req,res)=>{
    try {
        let id = req.params.id
        let product = await productModel.findById(id).populate('categoryid').populate('subcategoryid').populate('extracategoryid')
        res.render('Web/singleView',{product})
    } catch (error) {
        req.flash('error',error.message)
    }
}