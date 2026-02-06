const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
    },
    phone:{
        type:String
    },
    password:{
        type:String
    },
    gender:{
        type:String
    },
    role:{
        type:String
    },
    profileImage:{
        type:String
    },
    joindate:{
        type:String,
        default:`${new Date().toLocaleString('en-US', { month: 'short' })} ${new Date().getFullYear()}`
    }
})


module.exports = mongoose.model('admins',adminSchema)