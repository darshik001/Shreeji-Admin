const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
        minlength: 2,
    },
    categoryImage: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('categories', categorySchema)