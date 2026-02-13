const mongoose  = require('mongoose')

const ExtracategorySchema = mongoose.Schema({
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,        
        ref:'categories',
    },
    subcategoryid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,        
        ref:'subcategories',
    },
    extracategory:{
        type:String,
        trim:true,
        required:true        
    }
})


module.exports = mongoose.model('extracategories',ExtracategorySchema)
