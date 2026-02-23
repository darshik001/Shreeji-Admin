const mongoose = require('mongoose')
require('dotenv').config()

const dbconnection = ()=>{
        mongoose.connect("mongodb+srv://darshik111:dj123456@cluster0.h9zcb.mongodb.net/Shreeji-Admin")
        .then(()=>console.log('Database is Connected'))
        .catch(err=>console.log("error",err))
   }

   module.exports = dbconnection()