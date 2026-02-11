const mongoose = require('mongoose')

const subcategorySchema = mongoose.Schema({
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories'
    },
    subcategory:{
        type:String
    }
})


module.exports = mongoose.model('subcategories',subcategorySchema)