const { name } = require('ejs');
const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    userid:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'admins'
    },
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories'
    },
    subcategoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategories',
    },
    extracategoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'extracategories'
    },
    name:{
        type:String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
        minlength: 2,
    },

     price:{
        type:Number,
        required: true,
        trim: true,
        lowercase: true,
        index: true,
        minlength: 2,
    },

     stock:{
        type:Number,
        required: true,
       
    },

     description:{
        type:String,
        required: true,
        trim: true,
        lowercase: true,
        index: true,
        minlength: 2,
    },

     productImage:{
        type:[String],
        required: true,   
    }
})


module.exports = mongoose.model('products',ProductSchema)
