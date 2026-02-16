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
         required: true,
         trim: true,
        lowercase: true,
        unique: true,
        index: true,
        minlength: 2,     
    }
})


module.exports = mongoose.model('extracategories',ExtracategorySchema)
