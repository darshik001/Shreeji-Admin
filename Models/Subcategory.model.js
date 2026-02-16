const mongoose = require('mongoose')

const subcategorySchema = mongoose.Schema({
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories'
    },
    subcategory:{
        type:String,
         required: true,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
        minlength: 2,
    }
})


module.exports = mongoose.model('subcategories',subcategorySchema)